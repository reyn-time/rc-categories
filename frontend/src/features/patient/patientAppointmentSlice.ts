import { createPromiseClient } from "@connectrpc/connect";
import { PatientAppointmentService } from "../../gen/proto/patientappointment/v1/patientappointment_connect";
import { queryFnWrapper, transport } from "../../util/connect";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";
import {
  CreatePatientAppointmentRequest,
  DeletePatientAppointmentRequest,
  JoinPatientAppointmentRequest,
  PatientAppointment,
  QuitPatientAppointmentRequest,
  UpdatePatientAppointmentRequest,
} from "../../gen/proto/patientappointment/v1/patientappointment_pb";
import { NoBigIntMessage } from "../../util/types";

const client = createPromiseClient(PatientAppointmentService, transport);

export const patientAppointmentApi = createApi({
  reducerPath: "patientAppointmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Appointment"],
  endpoints: (builder) => ({
    listAppointment: builder.query<
      NoBigIntMessage<PlainMessage<PatientAppointment>>[],
      void
    >({
      providesTags: ["Appointment"],
      queryFn: queryFnWrapper(async () => {
        const res = await client.listCurrentPatientAppointment({});
        return {
          data: res.appointments.map((a) => ({
            ...toPlainMessage(a),
            startTime: a.startTime
              ? {
                  seconds: a.startTime.seconds.toString(),
                  nanos: a.startTime.nanos,
                }
              : undefined,
          })),
        };
      }),
    }),
    createAppointment: builder.mutation<
      void,
      PlainMessage<CreatePatientAppointmentRequest>
    >({
      invalidatesTags: ["Appointment"],
      queryFn: queryFnWrapper(async (req) => {
        await client.createPatientAppointment(req);
        return { data: undefined };
      }),
    }),
    updateAppointment: builder.mutation<
      void,
      PlainMessage<UpdatePatientAppointmentRequest>
    >({
      invalidatesTags: ["Appointment"],
      queryFn: queryFnWrapper(async (req) => {
        await client.updatePatientAppointment(req);
        return { data: undefined };
      }),
    }),
    deleteAppointment: builder.mutation<
      void,
      PlainMessage<DeletePatientAppointmentRequest>
    >({
      invalidatesTags: ["Appointment"],
      queryFn: queryFnWrapper(async (req) => {
        await client.deletePatientAppointment(req);
        return { data: undefined };
      }),
    }),
    joinAppointment: builder.mutation<
      void,
      PlainMessage<JoinPatientAppointmentRequest>
    >({
      invalidatesTags: ["Appointment"],
      queryFn: queryFnWrapper(async (req) => {
        await client.joinPatientAppointment(req);
        return { data: undefined };
      }),
    }),
    quitAppointment: builder.mutation<
      void,
      PlainMessage<QuitPatientAppointmentRequest>
    >({
      invalidatesTags: ["Appointment"],
      queryFn: queryFnWrapper(async (req) => {
        await client.quitPatientAppointment(req);
        return { data: undefined };
      }),
    }),
  }),
});

export const {
  useListAppointmentQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useJoinAppointmentMutation,
  useQuitAppointmentMutation,
} = patientAppointmentApi;
