import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminDashboard } from "@/types";

type TopDriverByEarningProps = {
  dashboard?: AdminDashboard;
};

const TopDriverByEarning = ({ dashboard }: TopDriverByEarningProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Drivers by Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dashboard?.driverActivity.topDriversByEarnings?.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{d.driver?.name}</TableCell>
                <TableCell className="text-right">{d.earnings} tk</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopDriverByEarning;
