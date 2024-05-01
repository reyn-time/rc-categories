import { PlainMessage } from "@bufbuild/protobuf";
import { Interval } from "../../gen/proto/interval/v1/interval_pb";

interface CreateIntervalPanel {
  type: "CreateInterval";
}

interface UpdateIntervalPanel {
  type: "UpdateInterval";
  interval: PlainMessage<Interval>;
  categoryNames: string[];
}

export type PanelTypes = CreateIntervalPanel | UpdateIntervalPanel;
