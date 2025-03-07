import { FC, ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";

const StyledWrapper = styled("main")({
  minHeight: "400px",
  overflowX: "hidden",
});

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <Helmet defaultTitle="CRDC Data Model Navigator">
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href={
          "https://fonts.googleapis.com/css2?" +
          "family=Nunito+Sans:wght@400;500;600;700;800;900&" +
          "family=Nunito:wght@300;400;500;600;700;800;900&" +
          "display=swap"
        }
        rel="stylesheet"
      />
    </Helmet>
    <StyledWrapper>{children || <Outlet />}</StyledWrapper>
  </>
);

export default Layout;
