"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LeaderboardUser = {
  id: string | number
  name: string
  points: number
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch("http://localhost:5000/api/leaderboard");
        const text = await res.text();
        let data: unknown;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`Unexpected non-JSON response: ${text}`);
        }
        if (!res.ok) {
          // include status and any error message from the server
          throw new Error(`HTTP ${res.status} — ${JSON.stringify(data)}`);
        }

        // Sort descending by points
        const typedData = data as LeaderboardUser[];
        typedData.sort((a, b) => b.points - a.points);
        setUsers(typedData);
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
        Loading leaderboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50 py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
        <div className="space-y-4">
          {users.map((user, index: number) => (
            <Card key={user.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {index + 1}. {user.name}
                  </CardTitle>
                  <Badge variant="outline">{user.points} pts</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
