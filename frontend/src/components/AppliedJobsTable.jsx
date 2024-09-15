import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobsTable = () => {

    const {allAppliedJobs} = useSelector(store => store.job);

  return (
    <div>
        <Table>
            <TableCaption>A list of your applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right" >Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allAppliedJobs.length === 0 ? <span>You haven't applied in any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id}>
                            <TableCell>{appliedJob.job.createdAt.split("T")[0]}</TableCell>
                            <TableCell>{appliedJob.job.title}</TableCell>
                            <TableCell>{appliedJob.job.company?.name}</TableCell>
                            <TableCell className="text-right"><Badge
                            className={appliedJob.status === "rejected" ? 'bg-red-500' : appliedJob.status === "pending" ? 'bg-slate-800' : 'bg-green-500'}
                            >{appliedJob.status.charAt(0).toUpperCase() + appliedJob.status.slice(1)}</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobsTable