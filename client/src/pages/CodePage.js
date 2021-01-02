import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { CodeModal, CodeList } from "../components/Codes/code_utils";
import { handleCreate, handleRemove } from "../components/Codes/code_methods";
import { useLoad } from "../utils/hooks";
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
const EMPTY_CODE_TEMPLATE = {
  code: "",
  value: 10,
};
const CodesPage = () => {
  const [codes, setCodes] = useLoad([], `${SERVER_URL}/discountCodes`);

  const [code, setCode] = useState(EMPTY_CODE_TEMPLATE);

  return (
    <AuthContext.Consumer>
      {(context) => (
        <div className="container row">
          <CodeModal
            onChange={(e) =>
              setCode({ ...code, [e.target.name]: e.target.value })
            }
            onCreate={() => handleCreate(code, setCodes)}
            onReset={() => setCode(EMPTY_CODE_TEMPLATE)}
          />
          <CodeList
            list={codes}
            onRemove={(id) => handleRemove(id, setCodes)}
          />
        </div>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(CodesPage);
