import {
  ActionIcon,
  Group,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon, IconDeviceDesktop } from "@tabler/icons-react";

const ColorSchemeIcons = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Group className="color-scheme-icons">
      <Tooltip
        label="По умолчанию"
        events={{ hover: true, focus: true, touch: false }}
        withArrow
      >
        <ActionIcon
          onClick={() => setColorScheme("auto")}
          variant={colorScheme === "auto" ? "gradient" : "default"}
          size="xl"
          aria-label="Toggle color scheme"
        >
          <IconDeviceDesktop className={"icon auto"} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        label="Темная тема"
        events={{ hover: true, focus: true, touch: false }}
        withArrow
      >
        <ActionIcon
          onClick={() => setColorScheme("dark")}
          variant={colorScheme === "dark" ? "gradient" : "default"}
          size="xl"
          aria-label="Toggle color scheme"
        >
          <IconMoon className={"icon dark"} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        label="Светлая тема"
        events={{ hover: true, focus: true, touch: false }}
        withArrow
      >
        <ActionIcon
          onClick={() => setColorScheme("light")}
          variant={colorScheme === "light" ? "gradient" : "default"}
          size="xl"
          aria-label="Toggle color scheme"
        >
          <IconSun className={"icon light"} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default ColorSchemeIcons;
