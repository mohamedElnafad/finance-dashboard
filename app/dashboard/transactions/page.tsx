"use client";

import { useState } from "react";
import { useGetTransactionsQuery } from "@/store/api/transactionsApi";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/Pagination";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useGetTransactionsQuery({
    search: debouncedSearch,
    type,
    page,
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-gray-900">Transactions</h1>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 placeholder:text-gray-500"
        />
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Title
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Category
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Date
              </th>
              <th className="text-right px-6 py-4 text-gray-500 font-medium">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : (
              data?.transactions?.map((t: any) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {t.title}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{t.category}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-medium
                  ${t.type === "income" ? "text-green-500" : "text-red-500"}`}
                  >
                    {t.type === "income" ? "+" : "-"}${t.amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data?.pages && (
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.pages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
