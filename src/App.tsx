import { Game } from "./pages/Game";
import { Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import { useStorageState } from "./hooks";
import { defaultUserProfile } from "./constants";
import { User } from "./types/user";
import { Settings } from "./pages/Settings";
import { ThemeProvider } from "@mui/material";
import { GlobalStyle, MuiTheme } from "./styles";
import { ToastContainer } from "react-toastify";
import { NotFound } from "./pages/NotFound";
import {useEffect} from "react";
import { MainLayout } from "./layouts/MainLayout";
//@ts-ignore
import { useTelegram } from "./hooks/useTelegram.js";
function App() {
  const {onToggleButton, tg, user} = useTelegram();
  const [userProfile, setUserProfile] = useStorageState<User>(
    defaultUserProfile,
    "userProfile"
  );
  const userProfileProps = { userProfile, setUserProfile };

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <ThemeProvider theme={MuiTheme}>
      <MainLayout {...userProfileProps}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Game {...userProfileProps} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/settings"
            element={<Settings {...userProfileProps} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="bottom-left"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </MainLayout>
    </ThemeProvider>
  );
}
export default App;
