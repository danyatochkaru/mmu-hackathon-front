import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Home() {
  return (
    <div  className="p-6">
    <Table className="max-w-7xl">
  <TableHeader className="bg-[#ffd600]">
    <TableRow>
      <TableHead className="w-80 text-black">Название компании</TableHead>
      <TableHead className="text-black">Описание</TableHead>
      <TableHead className="text-right w-48 text-black">Статус</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Название компании</TableCell>
      <TableCell>Краткое описание</TableCell>
      <TableCell className="text-right">Статус</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Название компании</TableCell>
      <TableCell>Краткое описание</TableCell>
      <TableCell className="text-right">Статус</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Название компании</TableCell>
      <TableCell>Краткое описание</TableCell>
      <TableCell className="text-right">Статус</TableCell>
    </TableRow>
  </TableBody>
</Table>
</div>
    
  );
}
