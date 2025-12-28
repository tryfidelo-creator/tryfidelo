export interface Greeting {
    greeting: string;
    message: string;
}

export function getTimeBasedGreeting(): Greeting {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        // Morning: 5 AM - 11:59 AM
        const morningMessages = [
            'Had breakfast yet😉?',
            'Time for some coffee🤗?',
            'Ready to conquer the day💪?',
            'Slept well😴?',
            'How\'s the morning treating you🤭?',
        ];
        return {
            greeting: 'Good morning',
            message: morningMessages[Math.floor(Math.random() * morningMessages.length)],
        };
    } else if (hour >= 12 && hour < 17) {
        // Afternoon: 12 PM - 4:59 PM
        const afternoonMessages = [
            'Had lunch yet🍽️?',
            'How\'s your day going😛?',
            'Time for a break☕?',
            'Staying productive🎯?',
            'Need a pick-me-up⚡?',
        ];
        return {
            greeting: 'Good afternoon',
            message: afternoonMessages[Math.floor(Math.random() * afternoonMessages.length)],
        };
    } else if (hour >= 17 && hour < 21) {
        // Evening: 5 PM - 8:59 PM
        const eveningMessages = [
            'Dinner yet🍜?',
            'How\'s your evening🌅?',
            'Winding down🛋️?',
            'Ready for some dinner🍴?',
            'Had a good day✨?',
        ];
        return {
            greeting: 'Good evening',
            message: eveningMessages[Math.floor(Math.random() * eveningMessages.length)],
        };
    } else {
        // Night: 9 PM - 4:59 AM
        const nightMessages = [
            'How\'s your night🌙?',
            'Rested😴?',
            'Late night supper🍕?',
            'Burning the midnight oil🔥?',
            'Night owl mode activated🦉?',
        ];
        return {
            greeting: 'Good night',
            message: nightMessages[Math.floor(Math.random() * nightMessages.length)],
        };
    }
}
