"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import spin from "../assets/icons/spin.svg";
import winner from "../assets/icons/winners.svg";
import redemption from "../assets/icons/redemption.svg";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Prize {
  _id: string;
  prize: string;
  maxWins: number;
  redeemInfo: string;
  winCount: number;
  event: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Winner {
  _id: string;
  code: string;
  prizeId: Prize | null;
  redeemed: boolean;
  eventId: Event | null;
  createdAt: string;
  updatedAt: string;
}

interface Event {
  _id: string;
  name: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  spinCount: number;
  lastSpinDate: string;
}

interface Overview {
  totalEvents: number;
  totalSpins: number;
  totalWinners: number;
  redeemedPrizes: number;
  activePrizes: number;
  recentWinners: Winner[];
  prizeDistribution: Array<{ _id: string; count: number }>;
  spinActivity: Array<{ _id: string; count: number }>;
}

const formatDate = (date: string, formatStr = "MMM d, yyyy") => {
  const d = new Date(date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  switch (formatStr) {
    case "MMM d, yyyy":
      return `${month} ${day}, ${year}`;
    case "MMM d":
      return `${month} ${day}`;
    default:
      return `${month} ${day}, ${year}`;
  }
};

export default function Overview() {
  const { token, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [overview, setOverview] = useState<Overview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [currentWinner, setCurrentWinner] = useState<Winner | null>(null);
  const [redeemCode, setRedeemCode] = useState("");
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOverviewData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/overview`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 401) {
        logout();
        setError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setOverview(data.data || null);
      } else {
        throw new Error(data.message || "Failed to fetch overview data");
      }
    } catch (error) {
      console.error("Error fetching overview data:", error);
      setError(error instanceof Error ? error.message : "Failed to load overview data");
    } finally {
      setLoading(false);
    }
  }, [token, setLoading, setError, logout, router]);

  const handleRedeemPrize = async (winner: Winner) => {
    setCurrentWinner(winner);
    setRedeemModalOpen(true);
    setRedeemCode(winner.code);
    setRedeemError(null);
  };

  const confirmRedeemPrize = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedeemError(null);

    if (!currentWinner) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/winners/${currentWinner._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ redeemed: true }),
        }
      );

      if (response.status === 401) {
        logout();
        setRedeemError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to redeem prize");
      }

      const updatedWinner = await response.json();

      if (overview) {
        setOverview({
          ...overview,
          recentWinners: overview.recentWinners.map((w) =>
            w._id === updatedWinner._id ? updatedWinner : w
          ),
          redeemedPrizes: overview.redeemedPrizes + 1,
        });
      }

      setRedeemModalOpen(false);
      setCurrentWinner(null);
    } catch (err) {
      setRedeemError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  useEffect(() => {
    if (authLoading) return; // Wait for AuthContext to finish loading

    if (token) {
      fetchOverviewData();
    }
  }, [authLoading, token, fetchOverviewData]);

  const filteredWinners =
    overview?.recentWinners?.filter((winner) =>
      winner.code.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (authLoading) return <div className="p-6">Loading...</div>;
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        Loading overview data...
      </div>
    );
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="">
      <div className="flex items-center justify-between mb-[2rem] mt-[3rem]">
        <h1 className="text-2xl font-bold">Overview</h1>
        <Link href={"/admin/events"}>
          <Button className="text-sm font-normal bg-primarys-100 text-white">
            Manage spinwheel
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <Card className="bg-gradient-to-r from-[#FFB600] to-[#FF9400] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Total Spins</CardTitle>
            <Image width={53} height={53} alt="spin" src={spin.src} />
          </CardHeader>
          <CardContent>
            <div className="text-[50px] font-bold">
              {overview?.totalSpins ?? 0}
            </div>
            <p className="text-xs text-white">Spins across all events</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-[#3D8CE7] to-[#3DAF34] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Total Winners
            </CardTitle>
            <Image width={53} height={53} alt="spin" src={winner.src} />
          </CardHeader>
          <CardContent>
            <div className="text-[53px] font-bold">
              {overview?.totalWinners ?? 0}
            </div>
            <p className="text-xs text-white">
              {overview?.redeemedPrizes ?? 0} prizes redeemed
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-[#6D5CF1] to-[#8F8EF2] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Redeemed Prizes
            </CardTitle>
            <Image width={53} height={53} alt="spin" src={redemption.src} />
          </CardHeader>
          <CardContent>
            <div className="text-[53px] font-bold">
              {overview?.redeemedPrizes ?? 0}
            </div>
            <p className="text-xs text-white">Total redeemed prizes</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex md:flex-row flex-col mt-[4rem] mb-[1rem] justify-between items-center">
        <h2 className="mb-[1rem] md:mb-0">Recent Winners</h2>
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Search redemption codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-[#CAC9CE2E] h-[50px]">
          <TableRow className="">
            <TableHead className="">Winner Code</TableHead>
            <TableHead>Prize</TableHead>
            <TableHead>Date Won</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {filteredWinners.length > 0 ? (
            filteredWinners.map((winner) => (
              <TableRow key={winner._id} className="h-[50px]">
                <TableCell className="font-medium">{winner.code}</TableCell>
                <TableCell>{winner.prizeId?.prize || "No prize"}</TableCell>
                <TableCell>{formatDate(winner.createdAt)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] ${
                      winner.redeemed
                        ? "bg-green-100 text-green-800"
                        : "bg-[#FF000033] text-[#FF0000]"
                    }`}
                  >
                    {winner.redeemed ? "Redeemed" : "Pending"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleRedeemPrize(winner)}
                    disabled={winner.redeemed}
                    className={
                      winner.redeemed ? "bg-gray-400" : "bg-primarys-100"
                    }
                  >
                    {winner.redeemed ? "Redeemed" : "Mark as Redeem"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                {searchTerm
                  ? "No matching winners found"
                  : "No winners available"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={redeemModalOpen} onOpenChange={setRedeemModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Redeem Prize</DialogTitle>
            <DialogDescription>
              Confirm redemption for winner code: {currentWinner?.code}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={confirmRedeemPrize}>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Winner Code:</p>
                <Input
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div>
                <p className="font-medium">Prize:</p>
                <p className="text-gray-700">
                  {currentWinner?.prizeId?.prize || "No prize"}
                </p>
              </div>

              {redeemError && (
                <p className="text-red-500 text-sm">{redeemError}</p>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setRedeemModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#FFB600] to-[#FF9400] text-white hover:from-[#FF9400] hover:to-[#FFB600]"
                >
                  Confirm Redemption
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}