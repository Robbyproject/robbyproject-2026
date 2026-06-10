// components/CalendarWrapper.tsx
"use client";

import { useTheme } from 'next-themes';
import { GitHubCalendar } from 'react-github-calendar';

const CalendarWrapper = () => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <div className="w-full flex justify-center py-4">
            <GitHubCalendar
                username="Robbyproject"
                blockSize={12}
                blockMargin={5}
                fontSize={14}
                colorScheme={isDark ? 'dark' : 'light'}
            />
        </div>
    );
};

export default CalendarWrapper;
