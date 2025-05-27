import { StyleSheet } from "react-native";
import Navigation from "./Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { logout, reloadJwtFromStorage } from "./redux/userSlice";

const queryClient = new QueryClient();
type DecodedToken = {
  exp: number;
};

export default function App() {

 /*   const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch<AppDispatch>();
  
useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000); // current time in seconds

        if (decoded.exp < now) {
          // Token has expired
          dispatch(logout());
        } else {
          // Token is valid
          dispatch(reloadJwtFromStorage(token));
        }
      } catch (error) {
        console.warn("Invalid token:", error);
        dispatch(logout()); // logout just in case
      }
    }
  }, [token]); */
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigation />
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
