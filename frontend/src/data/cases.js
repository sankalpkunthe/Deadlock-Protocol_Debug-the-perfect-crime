const cases = {
  1: {

    title: "The First Cut",

    questions: {

      1: {
        caseId: "C1Q1",
        subject: "The First Trace",

        police: `
Case ID: C1Q1
Officer: Sankalp

The room was too clean.
No signs of struggle. No forced entry.
Almost staged.

A single note was found placed at the center of the table.
"A man, a plan, a canal, Panama"

Sankalp read it once....
Then again........

Something about it felt... deliberate.
Not the words.
The structure.

He wrote it down again.
Slowly this time.
Trying to see what the killer wanted him to notice.

Help him figure out what is unusual about this message.
  `,

        glitch: `
You read it left to right.

Try not doing that.
  `,

        terminal: `
> FILE: TRACE_INPUT

INPUT:
"A man a plan a canal Panama"

OUTPUT:
true
  `,

autopsy: {
  subjectId: "TRACE-01",
  tod: "N/A",
  cause: "UNDETERMINED",

  notes: `
Text sample does not degrade under standard manipulation.
Orientation variance produces no observable deviation in output.
Minor inconsistencies detected but classified as non-fatal.
No clear point of failure identified.

Recommendation:
Subject requires alternate interpretation protocol.
  `
},

        image: "https://images.pexels.com/photos/2882550/pexels-photo-2882550.jpeg"
},


      2: {
        caseId: "C1Q2",
        subject: "The Same Note",

        police: `
Case ID: C1Q2
Officer: Sankalp

Sankalp didn’t leave the room....

Something felt unfinished...
He picked up the note again.

"A man, a plan, a canal, Panama"
This time… he stopped reading it as a sentence.

He started looking at it as fragments.

Letters.
Clusters.
Repetition.

Some characters appeared more often than others.
Among rest of which are equally repeated one was first..
Not by accident.... Deliberately...

One of them dominated the rest.
Why would someone emphasize a single element like that?

Help Sankalp identify what stands out the most in the message.
  `,

        glitch: `
You saw the whole thing.
Now look at the pieces.
  `,

        terminal: `
> FILE: TRACE_INPUT_2

INPUT:
"aaabbc"

OUTPUT:
a
  `,

        autopsy: {
          subjectId: "TRACE-01-B",
          tod: "N/A",
          cause: "PATTERN RETENTION",

          notes: `
Reanalysis of original sample initiated.
Element distribution is non-uniform.
Certain units exhibit elevated recurrence.
No clear structural shift from prior observation.
Significance of dominant element remains unresolved.
    `
        },

        image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg"
      }
    }
  },

  2: {
    title: "The Silent Witness",
    questions: {
      1: { subject: "Unknown Observer" }
    }
  }
};

export default cases;