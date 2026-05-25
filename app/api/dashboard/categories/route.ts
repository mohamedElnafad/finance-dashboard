import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import pool from "@/lib/db";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userResult = await pool.query("SELECT id FROM users WHERE email = $1", [
    session.user.email,
  ]);
  const userId = userResult.rows[0]?.id;

  const result = await pool.query(
    `SELECT 
      category as name,
      SUM(amount)::numeric as value
     FROM transactions
     WHERE user_id = $1 AND type = 'expense'
     GROUP BY category
     ORDER BY value DESC`,
    [userId],
  );

  return NextResponse.json(result.rows);
}
