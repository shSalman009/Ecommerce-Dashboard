import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  Check,
  Computer,
  Gamepad2,
  X,
} from "lucide-react";

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export const productsFilterOptions = [
  {
    title: "Status",
    value: "status",
    options: [
      {
        label: "In Stock",
        value: "In Stock",
        icon: Check,
      },
      {
        label: "Out of Stock",
        value: "Out of Stock",
        icon: X,
      },
    ],
  },
  {
    title: "Category",
    value: "category",
    options: [
      {
        label: "Computers",
        value: "Computers",
        icon: Computer,
      },
      {
        label: "Gaming",
        value: "Gaming",
        icon: Gamepad2,
      },
    ],
  },
];
