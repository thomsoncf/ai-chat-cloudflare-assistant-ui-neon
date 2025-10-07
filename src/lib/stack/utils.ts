import { User } from "@stackframe/stack";

export type ClientUser = {
  id: string;
  displayName?: string | null;
  primaryEmail?: string | null;
};

export function toClientUser(user: User): ClientUser {
  return {
    id: user.id,
    displayName: user.displayName,
    primaryEmail: user.primaryEmail,
  };
}

export function getUserName(user: ClientUser) {
  if (user.displayName) {
    return user.displayName;
  }

  if (user.primaryEmail) {
    // Extract the part before @ and format it nicely
    const emailName = user.primaryEmail.split("@")[0];
    // Replace dots, dashes, underscores with spaces and capitalize each word
    return emailName
      .replace(/[._-]/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return "Anonymous User";
}

export function getUserInitials(user: ClientUser): string {
  if (user.displayName) {
    const parts = user.displayName.trim().split(/\s+/);
    if (parts.length >= 2) {
      // First letter of first name + first letter of last name
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    // If single word, take first two characters
    return parts[0].slice(0, 2).toUpperCase();
  }

  if (user.primaryEmail) {
    const emailName = user.primaryEmail.split("@")[0];
    // Try to split by dots, dashes, underscores
    const parts = emailName.split(/[._-]/);
    if (parts.length >= 2) {
      // First letter of each part
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    // If no separators, take first two characters
    return emailName.slice(0, 2).toUpperCase();
  }

  return "G";
}
