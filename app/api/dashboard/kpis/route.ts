import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import pool from "@/lib/db";

export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user id from email
  const userResult = await pool.query("SELECT id FROM users WHERE email = $1", [
    session.user.email,
  ]);
  const userId = userResult.rows[0]?.id;

  // Get totals
  const result = await pool.query(
    `SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expenses
     FROM transactions 
     WHERE user_id = $1`,
    [userId],
  );

  const { total_income, total_expenses } = result.rows[0];
  const balance = Number(total_income || 0) - Number(total_expenses || 0);

  return NextResponse.json({
    balance: balance.toFixed(2),
    income: Number(total_income || 0).toFixed(2),
    expenses: Number(total_expenses || 0).toFixed(2),
  });
}
