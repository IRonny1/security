import { Navigate, Route, Routes } from "react-router-dom";

import withAuthorizedAccess from "../../hocs/withAuthorizedAccess";
import General from "../../pages/General/General";

function RoutesProvider() {
  return (
    <Routes>
      <Route path="/" element={<General />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default withAuthorizedAccess(RoutesProvider);
