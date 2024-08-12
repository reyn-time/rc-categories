import { createPromiseClient } from "@connectrpc/connect";
import { queryFnWrapper, transport } from "../../util/connect";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";
import { NoBigIntMessage } from "../../util/types";
import { PatientService } from "../../gen/proto/patient/v1/patient_connect";
import {
  ChangePatientStatusRequest,
  CreatePatientRequest,
  Patient,
} from "../../gen/proto/patient/v1/patient_pb";

const client = createPromiseClient(PatientService, transport);

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Patient"],
  endpoints: (builder) => ({
    listPatient: builder.query<NoBigIntMessage<PlainMessage<Patient>>[], void>({
      providesTags: ["Patient"],
      queryFn: queryFnWrapper(async () => {
        const res = await client.listPatient({});
        return {
          data: res.patients.map(toPlainMessage),
        };
      }),
    }),
    changePatientStatus: builder.mutation<
      void,
      PlainMessage<ChangePatientStatusRequest>
    >({
      queryFn: queryFnWrapper(async (req) => {
        await client.changePatientStatus(req);
        return { data: undefined };
      }),
      invalidatesTags: ["Patient"],
    }),
    createPatient: builder.mutation<void, PlainMessage<CreatePatientRequest>>({
      invalidatesTags: ["Patient"],
      queryFn: queryFnWrapper(async (req) => {
        await client.createPatient(req);
        return { data: undefined };
      }),
    }),
  }),
});

export const {
  useListPatientQuery,
  useCreatePatientMutation,
  useChangePatientStatusMutation,
} = patientApi;
