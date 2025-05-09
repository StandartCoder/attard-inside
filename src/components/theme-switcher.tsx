'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useThemeContext } from './theme-provider';
import { useTheme as useThemeStore, type AccentColor, accentColors } from '@/lib/theme';
import { Monitor, Sun, Moon } from 'lucide-react';

const themes = [
  { name: 'System', value: 'system', icon: Monitor },
  { name: 'Light', value: 'light', icon: Sun },
  { name: 'Dark', value: 'dark', icon: Moon },
] as const;

const colorOptions = [
  { name: 'Indigo', value: 'indigo' },
  { name: 'Blue', value: 'blue' },
  { name: 'Purple', value: 'purple' },
  { name: 'Pink', value: 'pink' },
  { name: 'Rose', value: 'rose' },
  { name: 'Orange', value: 'orange' },
] as const;

interface ThemeSwitcherProps {
  hideAccent?: boolean;
}

export function ThemeSwitcher({ hideAccent = false }: ThemeSwitcherProps) {
  const { theme, setTheme } = useThemeContext();
  const { accentColor, setAccentColor } = useThemeStore();
  const colors = accentColors[accentColor];
  const activeTheme = themes.find((t) => t.value === theme) || themes[0];

  return (
    <div className="flex items-center gap-4">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-2 rounded-xl bg-white/20 dark:bg-gray-800/60 px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-100 shadow-md hover:bg-white/30 dark:hover:bg-gray-700/80 transition-all border border-gray-200 dark:border-gray-700">
          {activeTheme.icon && <activeTheme.icon className="w-4 h-4 mr-1" />}
          <span>Theme</span>
          <svg
            className="h-4 w-4 ml-1 opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl bg-white dark:bg-gray-900 py-2 shadow-2xl ring-1 ring-black/10 focus:outline-none z-50 border border-gray-200 dark:border-gray-700">
            {themes.map((t) => (
              <Menu.Item key={t.value}>
                {({ active }) => (
                  <button
                    onClick={() => setTheme(t.value)}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-left text-base rounded-lg transition-all
                      ${active ? 'bg-gray-100 dark:bg-gray-800' : ''}
                      ${theme === t.value ? `${colors.text} font-bold` : 'text-gray-800 dark:text-gray-100'}`}
                  >
                    {t.icon && <t.icon className="w-4 h-4 mr-2" />}
                    {t.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>

      {!hideAccent && (
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white/20 dark:text-gray-200">
            <span>Color</span>
            <div
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor: `var(--${accentColor}-500)`,
              }}
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-800">
              {colorOptions.map((color) => (
                <Menu.Item key={color.value}>
                  {({ active }) => (
                    <button
                      onClick={() => setAccentColor(color.value as AccentColor)}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } ${accentColor === color.value ? `${colors.text} font-bold` : ''} flex w-full items-center gap-2 px-4 py-2 text-left text-sm`}
                    >
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{
                          backgroundColor: `var(--${color.value}-500)`,
                        }}
                      />
                      {color.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
} 