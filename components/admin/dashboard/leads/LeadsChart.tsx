"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoMdMore } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ILead } from "@/app/models/lead";
import dayjs from "dayjs";
import { BiTaskX } from "react-icons/bi";
import { IoPeople } from "react-icons/io5";
import Link from "next/link";
import { LuArrowUpDown } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectxs";

const LeadsChart = () => {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredLeads = leads.filter((lead) => {
    const search = searchTerm.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(search) ||
      lead.surname?.toLowerCase().includes(search) ||
      lead.interestedInName?.toLowerCase().includes(search) ||
      lead.leadVehicleName?.toLowerCase().includes(search)
    );
  });

  async function getLeads() {
    try {
      const leadsFetch = await fetch("/api/leads", {
        method: "GET",
        cache: "no-store",
      });
      const leads = await leadsFetch.json();
      setLoading(false);
      setLeads(leads.leads);
    } catch (error) {
      setLoading(false);
      return;
    }
  }

  useEffect(() => {
    getLeads();
  }, []);

  return (
    <>
      {loading && (
        <>
          <div
            className="flex items-center justify-center w-full overflow-y-hidden bg-white dark:bg-background"
            style={{ zIndex: "99999999", height: "50vh" }}
          >
            <div className=" loader"></div>
          </div>
        </>
      )}

      {!loading && (
        <>
          {/* search and filter bar */}
          <div className="flex justify-between mb-3">
            {/* search bar */}
            <div className="text-sm text-black bg-white groupSearch dark:bg-background dark:text-white">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="iconSearch">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input
                className="text-black inputSearch dark:text-white"
                type="search"
                placeholder="Buscar por nombre o vehículo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

          </div>


          {filteredLeads?.length === 0 && (
            <>
              <div className="flex flex-col items-center gap-1 justify-center w-full min-h-[300px] h-full">
                <IoPeople size={70} strokeWidth={0} />
                <span>Tu lista de leads está vacía.</span>
                <span className="text-sm opacity-50">
                  Creá un nuevo lead para comenzar a gestionar tu nuevo cliente.
                </span>
              </div>
            </>
          )}

          {filteredLeads?.length > 0 && (
            <>
              <Table>
                <TableCaption>Listado de leads.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-fit">Nombre </TableHead>
                    <TableHead className="w-fit">Estado</TableHead>
                    <TableHead className="w-fit">Veh. de interés</TableHead>


                    {searchTerm === "" && (
                      <TableHead className="flex items-center gap-1 w-fit">Último contacto <LuArrowUpDown /></TableHead>
                    )}


                    {searchTerm !== "" ? (
                      <TableHead className="flex items-center gap-1 w-fit">Veh. del lead <LuArrowUpDown /></TableHead>

                    ) : <TableHead className="w-fit">Próxima tarea</TableHead>}


                    {searchTerm !== "" && (
                      <TableHead className=" w-fit">Último contacto </TableHead>
                    )}
                    <TableHead className="w-10"></TableHead>

                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads?.map((lead) => (
                    <>
                      <TableRow key={lead._id}>
                        <TableCell className="text-xs font-medium">
                          {lead.name} {lead.surname}
                        </TableCell>
                        <TableCell className="font-medium">
                          {lead?.status === "Pendiente" && (
                            <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-800 dark:text-yellow-100">
                              Pendiente
                            </span>
                          )}
                          {lead?.status === "Gestionando" && (
                            <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-800 dark:text-yellow-100">
                              Gestionando
                            </span>
                          )}
                          {lead?.status === "Negociando" && (
                            <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-800 dark:text-yellow-100">
                              Negociando
                            </span>
                          )}
                          {lead?.status === "Perdido" && (
                            <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:bg-opacity-65 dark:text-red-200">
                              Perdido
                            </span>
                          )}
                          {lead?.status === "Vendido" && (
                            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                              Vendido
                            </span>
                          )}
                        </TableCell>
                        {searchTerm !== "" && (<>
                          <TableCell className="text-xs font-medium w-fit">
                            {lead.leadVehicleName}
                          </TableCell>

                        </>)}
                        <TableCell className="text-xs font-medium w-fit">
                          {lead.interestedInName === '' || !lead.interestedInName && (<>
                            <span>No especificado</span>
                          </>)}
                          {lead.interestedInName !== '' && (<>
                            {lead.interestedInName}
                          </>)}
                        </TableCell>
                        <TableCell className="text-xs font-medium w-fit min-w-28">
                          {dayjs(lead.createdAt).format("DD-MM-YYYY")}
                        </TableCell>
                        {searchTerm === "" && (<>

                          <TableCell className="text-xs font-medium w-fit">
                            {lead.pendingTask}
                          </TableCell>
                        </>)}


                        <TableCell className="text-right">
                          {/* edit */}
                          <Link href={`/admin/dashboard/leads/${lead._id}`}>
                            <Button variant="outline" className="p-2 w-fit h-fit">
                              <IoMdMore size={20} className="w-fit h-fit" />
                            </Button>
                          </Link>
                          {/* edit */}
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </>
      )
      }
    </>
  );
};

export default LeadsChart;
