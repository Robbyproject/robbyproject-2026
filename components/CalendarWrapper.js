// components/CalendarWrapper.js
"use client"; // <--- INI KUNCINYA. Wajib ada.

import { GitHubCalendar } from 'react-github-calendar';
// Coba import default (tanpa kurawal) dulu karena kita sudah di mode "use client".
// Jika nanti error merah lagi, baru ganti jadi import { GitHubCalendar } ...

const CalendarWrapper = () => {
    return (
        <div className="w-full flex justify-center py-4">
            <GitHubCalendar
                username="Robbyproject" // Ganti username kamu
                blockSize={12}
                blockMargin={5}
                fontSize={14}
                colorScheme="dark"
            />
        </div>
    );
};

export default CalendarWrapper;