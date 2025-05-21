
export const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-04-17";

export const PERSONALIZED_CUTE_MESSAGE_PROMPT = `
Generate a very short, cute, and lovely notification message for Naano from Dev.
The message should be affectionate, sweet, caring, and feel personal, as if Dev is sending it directly.
It could be a loving thought, a cheesy line, a gentle reminder of affection, a caring check-in (like asking if she has eaten or had water), or something to make Naano smile.
The message should be directly from Dev to Naano.
Keep it concise, suitable for a device notification (ideally under 25 words).

Examples (imagine Dev saying these to Naano):
- "Just thinking of you, Naano! Hope you're having a lovely moment. ❤️ - Dev"
- "Hey Naano, did you remember to drink some water? Stay hydrated, my love! Your Dev."
- "Naano, you make my world brighter! ✨ Thinking of you - Dev"
- "Sending a little sparkle your way, Naano! Hope you're smiling. From your Dev."
- "Hi Naano, have you eaten? Take care of yourself! Love, Dev"
- "Naano, remember I'm always here for you. Thinking of you! - Dev"
- "Hope you're having a good day, Naano! 😊 Your Dev."
- "Hey my dearest Naano, sending you a virtual hug! - Dev"
- "Naano, you're my favorite. Just a little reminder! - Dev"

Generate one such message:
`;

export const MESSAGE_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes
export const NOTIFICATION_ICON_URL = '/heart_icon_notification.png'; // Simple heart icon for notifications
