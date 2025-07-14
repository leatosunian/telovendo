import LeadModel from "@/app/models/lead";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  console.log("Conexión a DB exitosa");
  const data = await request.json();
  if (data.observations === "") {
    data.observations = "No hay descripcion.";
  }
  if (data.contactType === "") {
    data.contactType = "No especificado.";
  }
  if (data.interestedInName === "") {
    data.interestedInName = "No especificado.";
  }
  if (data.leadVehicleName === "") {
    data.leadVehicleName = "No especificado.";
  }
  try {
    console.log("Datos a guardar:", data);
    const newLead = await LeadModel.create(data);
    console.log('newlead:', newLead);
    return NextResponse.json({ msg: "LEAD_CREATED", newLead });
  } catch (error) {
    console.error("Error al crear lead:", error);
    return NextResponse.json({ msg: "LEAD_CREATION_ERROR" });
  }
}

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const leads = await LeadModel.find().sort({updatedAt: -1});
    return NextResponse.json({ msg: "LEAD_GET", leads });
  } catch (error) {
    return NextResponse.json({ msg: "GET_LEAD_ERROR" });
  }
}

export async function PUT(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  console.log(data);

  try {
    const editedLead = await LeadModel.findByIdAndUpdate(
      { _id: data._id },
      data,
      { new: true }
    );
    return NextResponse.json({ msg: "LEAD_EDITED", editedLead });
  } catch (error) {
    return NextResponse.json({ msg: "EDIT_LEAD_ERROR" });
  }
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  console.log(data);

  try {
    await LeadModel.findByIdAndDelete(data);
    return NextResponse.json({ msg: "LEAD_DELETED" });
  } catch (error) {
    return NextResponse.json({ msg: "DELETE_LEAD_ERROR" });
  }
}
