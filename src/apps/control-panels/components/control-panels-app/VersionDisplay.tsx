import { useTranslation } from "react-i18next";
import { useAppStoreShallow } from "@/stores/useAppStore";
import { getDocsBaseUrl } from "@/utils/runtimeConfig";

export function VersionDisplay() {
  const { t } = useTranslation();
  const { osVersion, osBuildNumber, launchApp } = useAppStoreShallow((state) => ({
    osVersion: state.osVersion,
    osBuildNumber: state.osBuildNumber,
    launchApp: state.launchApp,
  }));

  const displayVersion = osVersion || "...";
  const displayBuild = osBuildNumber ? ` (Build ${osBuildNumber})` : "";

  return (
    <p className="text-[11px] text-neutral-600 font-geneva-12">
      Skillforge OS {displayVersion}
      {displayBuild}
      {" · "}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          launchApp("internet-explorer", { url: "https://github.com/Techdoll00/skillforge", year: "current" });
        }}
        className="text-os-link hover:underline"
      >
        {t("apps.control-panels.viewChangelog")}
      </a>
      {" · "}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          launchApp("internet-explorer", {
            url: `${getDocsBaseUrl()}/privacy`,
            year: "current",
          });
        }}
        className="text-os-link hover:underline"
      >
        {t("apps.control-panels.privacyPolicy")}
      </a>
      {" · "}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          launchApp("internet-explorer", {
            url: `${getDocsBaseUrl()}/terms`,
            year: "current",
          });
        }}
        className="text-os-link hover:underline"
      >
        {t("apps.control-panels.termsOfService")}
      </a>
    </p>
  );
}
