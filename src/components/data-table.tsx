"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Columns3Icon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AdminDataTableProps<TData, TValue> = {
  title?: string;
  description?: string;
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  searchKey?: string;
  searchPlaceholder?: string;
  createLabel?: string;
  onCreate?: () => void;
  loading?: boolean;
};

export function DataTable<TData, TValue>({
  title,
  description,
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  createLabel = "Add New",
  onCreate,
  loading=false,
}: AdminDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section className="rounded-[1.5rem] border border-orange-100 bg-white">
      <div className="flex flex-col gap-4 border-b border-orange-100 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          {title && (
            <h2 className="text-xl font-bold tracking-tight text-stone-950">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-1 text-sm text-stone-500">{description}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {searchKey && (
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
              <Input
                placeholder={searchPlaceholder}
                value={
                  (table.getColumn(searchKey)?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="h-11 rounded-2xl border-orange-200 bg-orange-50/50 pl-9 focus-visible:ring-orange-400 sm:w-72"
              />
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-11 rounded-xl border-orange-200 bg-white text-stone-700 hover:bg-orange-50"
              >
                <Columns3Icon className="mr-2 size-4" />
                Columns
                <ChevronDownIcon className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="rounded-md border-orange-100"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    className="capitalize"
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {onCreate && (
            <Button
              onClick={onCreate}
              className="h-11 rounded-2xl bg-red-600 font-bold text-white hover:bg-red-700"
            >
              <PlusIcon className="mr-2 size-4" />
              {createLabel}
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-hidden px-6 py-6">
        <Table>
          <TableHeader className="bg-orange-50/70">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-orange-100">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-12 font-bold uppercase tracking-[0.16em] text-stone-500"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
  {loading ? (
    Array.from({ length: 5 }).map((_, rowIndex) => (
      <TableRow key={rowIndex} className="border-orange-100">
        {columns.map((_, cellIndex) => (
          <TableCell key={cellIndex} className="py-4">
            <div className="h-5 w-full max-w-[180px] animate-pulse rounded-full bg-orange-100" />
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : table.getRowModel().rows.length ? (
    table.getRowModel().rows.map((row) => (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
        className="border-orange-100 hover:bg-orange-50/50"
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className="py-4 text-stone-700">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        className="h-28 text-center text-sm text-stone-500"
      >
        No results found.
      </TableCell>
    </TableRow>
  )}
</TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 border-t border-orange-100 p-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-stone-500">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} selected.
        </p>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 md:flex">
            <p className="text-sm font-medium text-stone-600">Rows</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-9 w-20 rounded-xl border-orange-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm font-medium text-stone-600">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-9 rounded-xl border-orange-200 md:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeftIcon className="size-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="size-9 rounded-xl border-orange-200"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="size-9 rounded-xl border-orange-200"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="size-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="hidden size-9 rounded-xl border-orange-200 md:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}