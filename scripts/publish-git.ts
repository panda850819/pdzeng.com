type CommandOutput = "inherit" | "pipe";

export type CommandRunner = (command: string[], output?: CommandOutput) => string;

const isNonFastForward = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  return /\(fetch first\)|non-fast-forward/i.test(message);
};

export const pushMainWithRetry = (run: CommandRunner, maxAttempts = 3) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      run(["git", "push", "origin", "main"], "pipe");
      return;
    } catch (error) {
      if (!isNonFastForward(error) || attempt === maxAttempts) throw error;

      console.warn(`main advanced during publish; rebasing before retry ${attempt + 1}/${maxAttempts}`);
      try {
        run(["git", "pull", "--rebase", "origin", "main"]);
      } catch (rebaseError) {
        try {
          run(["git", "rebase", "--abort"], "pipe");
        } catch {
          // If rebase never started, there is nothing to abort.
        }
        throw rebaseError;
      }
    }
  }
};
