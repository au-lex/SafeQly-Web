// EscrowDetails.tsx
import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  DollarSign,
  Clock,
  Package,
  Loader2,
  FileText,
  AlertTriangle,
  Check,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../Layout/Layout";
import TransactionInfoItem from "./EscrowInfoItem";
import ProgressStepItem from "./ProgressStepItem";
import RaiseDisputeModal from "../../Dispute/RaiseDispute"; 
import {
  useGetEscrowById,
  useCompleteEscrow,
  useReleaseEscrow,
} from "../../../Hooks/useEscrow";
import { useGetUserProfile } from "../../../Hooks/useProfile";
import type { ProgressStep } from "../../../types";

const EscrowDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // State for the Dispute Modal
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);

  // Get current user data
  const { data: currentUser } = useGetUserProfile();
  const currentUserId = currentUser?.id;

  // Fetch escrow data
  const { data: escrowData, isLoading } = useGetEscrowById(id || "");
  const { mutate: completeEscrow, isPending: isCompleting } = useCompleteEscrow();
  const { mutate: releaseEscrow, isPending: isReleasing } = useReleaseEscrow();

  const escrow = escrowData?.escrow;

  // Correctly determine if current user is buyer or seller using IDs
  const isBuyer = useMemo(
    () => escrow?.buyer_id === currentUserId,
    [escrow?.buyer_id, currentUserId]
  );

  const isSeller = useMemo(
    () => escrow?.seller_id === currentUserId,
    [escrow?.seller_id, currentUserId]
  );

  const getProgressSteps = (): ProgressStep[] => {
    if (!escrow) return [];

    const steps: ProgressStep[] = [];

    // Step 1: Transaction Accepted
    if (escrow.accepted_at) {
      steps.push({
        id: "1",
        title: "Transaction Accepted",
        description: new Date(escrow.accepted_at).toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        status: "completed",
      });
    } else {
      steps.push({
        id: "1",
        title: "Transaction Accepted",
        description: "Waiting for seller to accept",
        status: escrow.status === "pending" ? "current" : "pending",
      });
    }

    // Step 2: Processing Transaction (Delivery)
    if (escrow.completed_at) {
      steps.push({
        id: "2",
        title: "Delivery Completed",
        description: new Date(escrow.completed_at).toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        status: "completed",
      });
    } else if (escrow.status === "accepted") {
      steps.push({
        id: "2",
        title: "Processing Delivery",
        description: "Seller is preparing delivery",
        status: "current",
      });
    } else {
      steps.push({
        id: "2",
        title: "Processing Delivery",
        description: "Not started",
        status: "pending",
      });
    }

    // Step 3: Transaction Completed (Funds Released)
    if (escrow.released_at) {
      steps.push({
        id: "3",
        title: "Funds Released",
        description: new Date(escrow.released_at).toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        status: "completed",
      });
    } else if (escrow.status === "completed") {
      steps.push({
        id: "3",
        title: "Awaiting Fund Release",
        description: "Buyer needs to confirm receipt",
        status: "current",
      });
    } else {
      steps.push({
        id: "3",
        title: "Funds Released",
        description: "Not started",
        status: "pending",
      });
    }

    return steps;
  };

  const handleMarkComplete = (): void => {
    if (!id) return;
    completeEscrow(id);
  };

  const handleReleaseFunds = (): void => {
    if (!id) return;
    releaseEscrow(id);
  };

  // Trigger the Modal
  const handleRaiseDispute = (): void => {
    setIsDisputeModalOpen(true);
  };

  const handleBack = (): void => {
    navigate("/escrows");
  };

  const handleDownloadFile = (): void => {
    if (escrow?.attached_file_url) {
      window.open(escrow.attached_file_url, "_blank");
    }
  };

  const formatDeliveryDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "text-amber-500 bg-amber-500";
      case "accepted":
        return "text-blue-500 bg-blue-500";
      case "completed":
        return "text-green-500 bg-green-500";
      case "released":
        return "text-green-600 bg-green-600";
      case "rejected":
        return "text-red-500 bg-red-500";
      case "disputed":
        return "text-orange-500 bg-orange-500";
      default:
        return "text-gray-500 bg-gray-500";
    }
  };

  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      pending: "Pending",
      accepted: "Accepted",
      rejected: "Rejected",
      completed: "Completed",
      released: "Released",
      disputed: "Disputed",
      cancelled: "Cancelled",
    };
    return statusMap[status] || status;
  };

  // Calculate transaction fee
  const transactionFee = escrow ? (escrow.amount * 0.02).toFixed(2) : "0.00";

  if (isLoading) {
    return (
      <Layout>
        <section className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-pri" />
        </section>
      </Layout>
    );
  }

  if (!escrow) {
    return (
      <Layout>
        <section className="min-h-screen bg-gray-50 flex items-center justify-center">
          <section className="text-center">
            <p className="text-gray-500 mb-4">Escrow not found</p>
            <button
              onClick={handleBack}
              className="text-pri font-semibold hover:underline"
            >
              Go back
            </button>
          </section>
        </section>
      </Layout>
    );
  }

  const progressSteps = getProgressSteps();
  const statusColorClass = getStatusColor(escrow.status);

  return (
    <Layout>
      <section className="min-h-screen bg-gray-50">
        <section className="max-w-2xl mx-auto bg-white min-h-screen">
          {/* Header */}
          <section className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 z-10">
            <section className="flex items-center">
              <button
                onClick={handleBack}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors mr-3"
              >
                <ChevronLeft size={24} className="text-gray-900" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">
                Transaction Summary
              </h1>
            </section>
          </section>

          {/* Content */}
          <section className="px-4 py-6">
            {/* Amount Section */}
            <section className="text-center mb-6">
              <p className="text-sm text-gray-400 mb-2">Amount</p>
              <p className="text-4xl font-bold text-gray-900">
                ₦
                {escrow.amount.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </section>

            {/* Both Parties Info Card */}
            <section className="bg-gray-50 p-4 rounded-xl mb-6">
              {/* Buyer Info */}
              <section className="flex items-center justify-between mb-4">
                <section className="flex items-center flex-1">
                  <img
                    src={escrow.buyer?.avatar || "https://i.pravatar.cc/150"}
                    alt={escrow.buyer?.full_name}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <section className="ml-3">
                    <p className="text-sm font-semibold text-gray-900">
                      {escrow.buyer?.full_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {escrow.buyer?.user_tag}
                    </p>
                  </section>
                </section>
                <section className="text-xs text-gray-400 font-medium">BUYER</section>
              </section>

              <section className="border-t border-gray-200 my-3"></section>

              {/* Seller Info */}
              <section className="flex items-center justify-between">
                <section className="flex items-center flex-1">
                  <img
                    src={escrow.seller?.avatar || "https://i.pravatar.cc/150"}
                    alt={escrow.seller?.full_name || "Seller"}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <section className="ml-3">
                    <p className="text-sm font-semibold text-gray-900">
                      {escrow.seller?.full_name || "Unknown Seller"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {escrow.seller?.user_tag || ""}
                    </p>
                  </section>
                </section>
                <section className="text-xs text-gray-400 font-medium">SELLER</section>
              </section>

              {/* Status and Amount */}
              <section className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <section className="flex items-center gap-1">
                  <span
                    className={`text-xs font-medium ${
                      statusColorClass.split(" ")[0]
                    }`}
                  >
                    {getStatusText(escrow.status)}
                  </span>
                  <section
                    className={`w-1.5 h-1.5 rounded-full ${
                      statusColorClass.split(" ")[1]
                    }`}
                  ></section>
                </section>
                <p className="text-sm font-bold text-gray-900">
                  ₦
                  {escrow.amount.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </section>
            </section>

            {/* Transaction Details */}
            <section className="space-y-1 mb-8">
              <TransactionInfoItem
                icon={<DollarSign size={18} className="text-blue-500" />}
                label="Transaction fee:"
                value={`₦${transactionFee}`}
                iconBgColor="bg-blue-100"
              />
              <TransactionInfoItem
                icon={<Clock size={18} className="text-blue-500" />}
                label="Est delivery date:"
                value={formatDeliveryDate(escrow.delivery_date)}
                iconBgColor="bg-blue-100"
              />
              <TransactionInfoItem
                icon={<Package size={18} className="text-blue-500" />}
                label="Items:"
                value={escrow.items}
                iconBgColor="bg-blue-100"
              />
              {escrow.attached_file_url && (
                <section
                  onClick={handleDownloadFile}
                  className="flex items-center py-3 cursor-pointer hover:bg-gray-50 rounded-lg -mx-2 px-2"
                >
                  <section className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <FileText size={18} className="text-blue-500" />
                  </section>
                  <span className="flex-1 text-sm text-gray-500">
                    Attached file:
                  </span>
                  <span className="text-sm font-semibold text-pri hover:underline">
                    {escrow.attached_file_name || "Download"}
                  </span>
                </section>
              )}
            </section>

            {/* Transaction Progress */}
            <section className="mb-6">
              <h2 className="text-base font-bold text-gray-900 mb-2">
                Transaction Progress
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Track the progress of this transaction and see updates from both
                parties.
              </p>

              <section>
                {progressSteps.map((step, index) => (
                  <ProgressStepItem
                    key={step.id}
                    step={step}
                    isLast={index === progressSteps.length - 1}
                  />
                ))}
              </section>
            </section>
          </section>

          {/* Bottom Buttons */}
          {/* Seller: Can complete transaction when status is 'accepted' */}
          {escrow.status === "accepted" && isSeller && (
            <section className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-4 space-y-3">
              <button
                onClick={handleMarkComplete}
                disabled={isCompleting}
                className="w-full bg-pri text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isCompleting ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Marking Complete...
                  </>
                ) : (
                  "Mark Delivery as Complete"
                )}
              </button>
              <button
                onClick={handleRaiseDispute}
                className="w-full bg-white text-red-500 py-4 rounded-xl font-bold border-2 border-red-500 hover:bg-red-50 transition-colors flex items-center justify-center"
              >
                <AlertTriangle size={20} className="mr-2" />
                Raise Dispute
              </button>
            </section>
          )}

          {/* Buyer: Can release funds when status is 'completed' */}
          {escrow.status === "completed" && isBuyer && (
            <section className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-4 space-y-3">
              <button
                onClick={handleReleaseFunds}
                disabled={isReleasing}
                className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isReleasing ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Releasing Funds...
                  </>
                ) : (
                  "Confirm Receipt & Release Funds"
                )}
              </button>
              <button
                onClick={handleRaiseDispute}
                className="w-full bg-white text-red-500 py-4 rounded-xl font-bold border-2 border-red-500 hover:bg-red-50 transition-colors flex items-center justify-center"
              >
                <AlertTriangle size={20} className="mr-2" />
                Raise Dispute
              </button>
            </section>
          )}

          {/* Transaction completed - no dispute button after funds are released */}
          {escrow.status === "released" && (
            <section className="sticky bottom-0 bg-white border border-gray-100 px-4 py-4">
              <section className="text-center py-2 bg-pri rounded">
                <p className="text-white font-semibold text-sm">
                   Escrow Completed <Check size={20} className="inline-block" /> 
                </p>
                <p className="text-sm text-gray-100 mt-1">
                  Funds have been released to the seller
                </p>
              </section>
            </section>
          )}

          {/* --- DISPUTE MODAL INTEGRATION --- */}
          <RaiseDisputeModal 
            isOpen={isDisputeModalOpen}
            onClose={() => setIsDisputeModalOpen(false)}
            escrowId={escrow.id} // Passing the current escrow ID
          />
        </section>
      </section>
    </Layout>
  );
};

export default EscrowDetails;