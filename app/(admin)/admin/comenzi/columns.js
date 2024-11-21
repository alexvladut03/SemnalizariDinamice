"use client";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = [
  {
    accessorKey: "order-number",
    header: () => <div className="w-10">Numarul comenzii</div>,
  },
  {
    accessorKey: "client-name",
    header: "Nume client",
  },
  {
    accessorKey: "client-phone",
    header: "Telefon client",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "order-status",
    header: "Statusul comenzii",
  },
  {
    accessorKey: "order-total",
    header: "Totalul comenzii",
  },
  {
    accessorKey: "order-shipping-method",
    header: "Metoda de livrare",
  },
  {
    accessorKey: "order-payment-method",
    header: "Metoda de plata",
  },
  {
    accessorKey: "order-actions",
    header: "Actiuni",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
