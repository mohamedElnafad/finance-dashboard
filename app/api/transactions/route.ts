import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import pool from "@/lib/db";

const ITEMS_PER_PAGE = 7;

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "all";
  const page = parseInt(searchParams.get("page") || "1");
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const userResult = await pool.query("SELECT id FROM users WHERE email = $1", [
    session.user.email,
  ]);
  const userId = userResult.rows[0]?.id;

  const conditions = ["user_id = $1"];
  const values: any[] = [userId];
  let i = 2;

  if (search) {
    conditions.push(`title ILIKE $${i}`);
    values.push(`%${search}%`);
    i++;
  }

  if (type !== "all") {
    conditions.push(`type = $${i}`);
    values.push(type);
    i++;
  }

  const where = conditions.join(" AND ");

  const countResult = await pool.query(
    `SELECT COUNT(*) FROM transactions WHERE ${where}`,
    values,
  );
  const total = parseInt(countResult.rows[0].count);

  const result = await pool.query(
    `SELECT * FROM transactions 
     WHERE ${where}
     ORDER BY date DESC
     LIMIT $${i} OFFSET $${i + 1}`,
    [...values, ITEMS_PER_PAGE, offset],
  );

  return NextResponse.json({
    transactions: result.rows,
    total,
    pages: Math.ceil(total / ITEMS_PER_PAGE),
    currentPage: page,
  });
}
