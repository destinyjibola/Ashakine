"use client";
import { useState, useEffect } from "react";
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
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Link from "next/link";

// Define types based on API response
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
  prizeId: Prize;
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// Custom date formatting function
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
  const { token, loading: authLoading } = useAuth();
  const userdata = useAuth()
  const router = useRouter();
  const [overview, setOverview] = useState<Overview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !token) {
      setError("No authentication token available");
      setLoading(false);
      router.push("/auth/login");
      return;
    }

    if (!authLoading && token) {
      fetchOverviewData();
    }
  }, [authLoading, token, router]);

  const fetchOverviewData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/overview`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.success) {
        setOverview(data.data || null);
      } else {
        setError("Failed to fetch overview data");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching overview data:", error);
      setError("Failed to load overview data");
      setLoading(false);
    }
  };

  if (authLoading) return <div className="p-6">Loading...</div>;
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        Loading overview data...
      </div>
    );
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Overview</h1>

      {/* Summary Cards */}
      <div className="flex items-center justify-between">
        <Link href={"/admin/events"}>
          <Button className=" text-black bg-white hover:bg-white">
            Create Events +
          </Button>
        </Link>

        <Link href={"/admin/events"}>
          <Button className="text-black bg-white hover:bg-white">
            View all events
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overview?.totalEvents ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">All your events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spins</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              <path d="M12 2v4" />
              <path d="m5.6 5.6 2.8 2.8" />
              <path d="M12 20v-2" />
              <path d="m18.4 18.4-2.8-2.8" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overview?.totalSpins ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Spins across all events
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Winners</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v4" />
              <path d="m5 5 2 2" />
              <path d="M19 5l-2 2" />
              <path d="M5 19l2-2" />
              <path d="M22 12h-4" />
              <path d="m5 11 2 2" />
              <path d="m15 11-2 2" />
              <path d="M19 19l-2-2" />
              <path d="M12 22v-4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overview?.totalWinners ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {overview?.redeemedPrizes ?? 0} prizes redeemed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prizes</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v4" />
              <path d="m5 5 2 2" />
              <path d="M19 5l-2 2" />
              <path d="M5 19l2-2" />
              <path d="M22 12h-4" />
              <path d="m5 11 2 2" />
              <path d="m15 11-2 2" />
              <path d="M19 19l-2-2" />
              <path d="M12 22v-4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overview?.activePrizes ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently available prizes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Redeemed Prizes
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overview?.redeemedPrizes ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Total redeemed prizes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Spin Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Spin Activity</CardTitle>
            <CardDescription>Spins over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={overview?.spinActivity ?? []}
                  margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="_id"
                    tickFormatter={(value) => formatDate(value, "MMM d")}
                  />
                  <YAxis />
                  <Tooltip labelFormatter={(value) => formatDate(value)} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Prize Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Prize Distribution</CardTitle>
            <CardDescription>Wins by prize type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overview?.prizeDistribution ?? []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="_id"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {overview?.prizeDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} wins`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Winners Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Winners</CardTitle>
          <CardDescription>The most recent prize winners</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Winner Code</TableHead>
                <TableHead>Prize</TableHead>
                {/* <TableHead>Event</TableHead> */}
                <TableHead>Date Won</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overview?.recentWinners?.map((winner) => (
                <TableRow key={winner._id}>
                  <TableCell className="font-medium">{winner.code}</TableCell>
                  <TableCell>{winner.prizeId.prize}</TableCell>
                  {/* <TableCell>{winner.eventId?.name || "N/A"}</TableCell> */}
                  <TableCell>{formatDate(winner.createdAt)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        winner.redeemed
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {winner.redeemed ? "Redeemed" : "Pending"}
                    </span>
                  </TableCell>
                </TableRow>
              )) ?? (
                <TableRow>
                  <TableCell colSpan={5}>No winners available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
