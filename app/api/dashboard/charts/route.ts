import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import pool from "@/lib/db";

export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userResult = await pool.query("SELECT id FROM users WHERE email = $1", [
    session.user.email,
  ]);
  const userId = userResult.rows[0]?.id;

  const result = await pool.query(
    `SELECT 
      TO_CHAR(date, 'Mon') as month,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses
     FROM transactions
     WHERE user_id = $1
     GROUP BY TO_CHAR(date, 'Mon'), DATE_TRUNC('month', date)
     ORDER BY DATE_TRUNC('month', date)`,
    [userId],
  );

  return NextResponse.json(result.rows);
}
