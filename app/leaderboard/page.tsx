"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_ENDPOINTS } from "@/lib/api-config";

type LeaderboardUser = {
  id: string | number;
  name: string; 
  points: number;
};

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch(API_ENDPOINTS.leaderboard);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} — Failed to fetch leaderboard`);
        }
        
        const data = await res.json();

        const sortedData = (data as LeaderboardUser[]).sort((a, b) => {
          // 1. Primary Sort: Points (Descending)
          const pointDiff = b.points - a.points;
          
          // 2. Secondary Sort: Name (Alphabetical) if points are equal
          if (pointDiff === 0) {
            const nameA = (a.name || "").trim().toLowerCase();
              const nameB = (b.name || "").trim().toLowerCase();
              return nameA.localeCompare(nameB);
          }
          
          return pointDiff;
        });
        
        setUsers(sortedData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Leaderboard fetch error:", err);     
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse text-muted-foreground">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-center px-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50 py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Leaderboard</h1>

        {users.length === 0 ? (
          <Card className="p-12 border-dashed border-2 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-semibold text-muted-foreground">
              No results found in the Attendance sheet.
            </h2>
          </Card>
        ) : (
          <div className="space-y-3">
            {users.map((user, index: number) => (
              <Card key={user.id || index} className="overflow-hidden hover:bg-accent/5 transition-colors border-l-4 border-l-primary">
                <CardHeader className="py-4 px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Rank and Name side-by-side */}
                      <span className="text-xl font-bold text-primary w-8">
                        {index + 1}
                      </span>
                      <CardTitle className="text-lg font-semibold">
                        {user.name}
                      </CardTitle>
                    </div>
                    <Badge variant="secondary" className="text-md font-medium px-3 py-1">
                      {user.points} pts
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}