import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, ButtonBase } from "@mui/material";

interface sideNavItemInterface {
  active: boolean;
  disabled: boolean;
  external: boolean;
  icon: React.ReactNode;
  path: string;
  title: string;
  type?: string;
}
export const SideNavItem = (props: sideNavItemInterface) => {
  const { active = false, disabled, external, icon, path, title, type } = props;

  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : {
          component: NextLink,
          href: path,
        }
    : {};

  const showComponent = () => (
    <>
      <Box
        component="span"
        sx={{
          color: "neutral.400",
          flexGrow: 1,
          fontFamily: (theme) => theme.typography.fontFamily,
          fontSize: 14,
          fontWeight: 600,
          lineHeight: "24px",
          whiteSpace: "nowrap",
          ...(active && {
            color: "common.white",
          }),
          ...(disabled && {
            color: "neutral.500",
          }),
        }}
      >
        {title}
      </Box>
    </>
  );
  return (
    <li>
      {type === "parent" ? (
        <Box
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            textTransform: "uppercase",
          }}
        >
          {showComponent()}
        </Box>
      ) : (
        <ButtonBase
          sx={{
            alignItems: "center",
            borderRadius: 1,
            display: "flex",
            justifyContent: "flex-start",
            pl: "16px",
            pr: "16px",
            py: "6px",
            textAlign: "left",
            width: "100%",
            ...(active && {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            }),
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            },
          }}
          {...linkProps}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: "center",
                color: "neutral.400",
                display: "inline-flex",
                justifyContent: "center",
                mr: 2,
                ...(active && {
                  color: "primary.main",
                }),
              }}
            >
              {icon}
            </Box>
          )}
          {showComponent()}
        </ButtonBase>
      )}
    </li>
  );
};
