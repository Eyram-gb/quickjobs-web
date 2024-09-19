"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    Row,
} from "@tanstack/react-table"
import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ChevronsUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download } from "lucide-react"
import { mkConfig, generateCsv, download } from 'export-to-csv'
import { Application } from "./columns"
// import { Application } from '@/types/application' // Adjust the import path as needed

// Remove or update the csvConfig if needed
const csvConfig = mkConfig({
    fieldSeparator: ',',
    filename: 'applications_info', // Updated filename
    decimalSeparator: '.',
    useKeysAsHeaders: true,
})

function exportExcel<T>(rows: Row<T>[]) {
    const rowData = rows.map((row) => {
        const { original } = row;
        return Object.fromEntries(
            Object.entries(original as Record<string, unknown>).map(([key, value]) => [key, String(value)])
        );
    });
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    initialColumnVisibility: VisibilityState
}

// Remove the TData extends { dob: Date } constraint
export function DataTable<TData, TValue>({
    columns,
    data,
    initialColumnVisibility
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility) //pass empty object if there are no default visibility columns
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        initialState: {
            columnVisibility,
        },
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className='w-full'>
            <div className="flex justify-between items-center py-4">
                <Input
                    placeholder="Filter by gig title..."
                    value={(table.getColumn("gig_title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("gig_title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className='flex gap-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto inline-flex gap-x-2">
                                Columns <ChevronsUpDown size={16} strokeWidth={1} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={() => exportExcel<TData>(table.getFilteredRowModel().rows)} className='inline-flex gap-x-2'>Export Data <Download size={16} strokeWidth={1} /></Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className='bg-gray-100 font-bold'>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-2">
                <div className='flex justify-end items-center gap-x-3 mt-2'>
                    <Button
                        size='icon'
                        variant='outline'
                        disabled={table.getState().pagination.pageIndex === 0}
                        onClick={() => table.setPageIndex(0)}
                        className='disabled:text-gray-600'
                    >
                        <ChevronsLeft size={20} strokeWidth={1} />
                    </Button>
                    <Button size='icon'
                        variant='outline' className='disabled:text-gray-600' disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
                        <ChevronLeft size={20} strokeWidth={1} />
                    </Button>
                    <p>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</p>
                    <Button size='icon'
                        variant='outline' className='disabled:text-gray-600' disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
                        <ChevronRight size={20} strokeWidth={1} />
                    </Button>
                    <Button
                        size='icon'
                        variant='outline'
                        disabled={table.getPageCount() === table.getState().pagination.pageIndex + 1}
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        className='disabled:text-gray-600'
                    >
                        <ChevronsRight size={20} strokeWidth={1} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
