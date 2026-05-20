const cases = {
  1: {

    title: "The First Cut",

    questions: {

      1: {
        caseId: "C1Q1",
        subject: "The Shadowy Evidence",

        police: `
Detective, we found a torn ledger clutched in the victim’s hand. The ledger contains a
sequence of numerical IDs, and the killer left a blood-stained footprint associated with a
specific security total. We need to identify the exact pair of suspect IDs that sum to this
total to breach the syndicate’s vault.
  `,

        glitch: `
The killer wouldn’t leave the exact same trace twice. Perhaps maintaining a private mental ledger of past encounters will reveal the missing pair.
  `,

        terminal: `
> FILE: TRACE_INPUT

Test Case 1:
INPUT:
"nums = [2,7,11,15], target = 9"

OUTPUT:
[0,1]

Test Case 2:
INPUT:
nums = [3,2,4], target = 6

OUTPUT:
[1,2]

Constraints: 
2 <= nums.length <= 10^4
  `,

autopsy: {
  subjectId: "TRACE-01",
  tod: "N/A",
  cause: "UNDETERMINED",

  notes: `
Lividity indicates the body was moved post-mortem, pointing to a secondary crime scene.
Trace amounts of a rare synthetic poison were found on the collar. The angle of the
primary wound suggests the attacker was taller than the victim and struck with surgical
precision.
  `
},

        image: "https://picsum.photos/seed/case_1/600/250"
},


      2: {
        caseId: "C1Q2",
        subject: "The Silent Evidence",

        police: `
A suspect claims they were at the mainframe terminal exactly when the security feed
cut out. We suspect the logs were tampered with. The syndicate’s tampering software
always forces the timestamp to mirror itself perfectly from start to finish. Analyze the
recovered temporal signature to verify the alibi.
  `,

        glitch: `
Time in this facility loops back on itself. If you trace the digital timeline
backwards, a true alibi will look identical to a fabricated one.
  `,

        terminal: `
> FILE: TRACE_INPUT_2

Test Case 1:
INPUT:
x = 121

OUTPUT:
true

Test Case 2:
INPUT:
x =-121

OUTPUT:
false

Constraints:
-2^31 <= x <= 2^31- 1
  `,

        autopsy: {
          subjectId: "TRACE-01-B",
          tod: "N/A",
          cause: "PATTERN RETENTION",

          notes: `
The smartwatch heart monitor flatlined at exactly 02:20 AM. No signs of struggle were
detected in the immediate vicinity, implying the victim knew their killer. Micro-abrasions
on the wrists suggest they were restrained with industrial zip-ties prior to the fatal blow.
    `
        },

        image: "https://picsum.photos/seed/case_2/600/250"
      },


      3: {
        caseId: "C1Q3",
        subject: "The Shadowy Evidence",

        police: `
Written in blood on the victim’s monitor is an ancient cipher sequence. Our analyst
believes it represents the locker number at the central station where the murder weapon
is stashed. Convert this archaic format into standard digital coordinates so we can secure
the weapon.
  `,

        glitch: `
The syndicate deals in ancient hierarchies. When a lesser operative
stands directly before a superior, their value is subtracted from the operation.
  `,

        terminal: `
> FILE: TRACE_INPUT_2

Test Case 1:
INPUT:
s = "III"

OUTPUT:
3

Test Case 2:
INPUT:
s = "MCMXCIV"

OUTPUT:
1994

Constraints:
1 <= s.length <= 15
  `,

        autopsy: {
          subjectId: "TRACE-01-B",
          tod: "N/A",
          cause: "PATTERN RETENTION",

          notes: `
A deep laceration on the right shoulder strongly suggests a left-handed attacker. Blood
spatter patterns on the adjacent server rack indicate a rapid, singular, sweeping strike.
Subcutaneous bruising hints at a brief but violent altercation minutes before death.
    `
        },

        image: "https://picsum.photos/seed/case_3/600/250"
      },


      4: {
        caseId: "C1Q4",
        subject: "The Cryptic Evidence",

        police: `
The intercepted transmission contains a batch of fragmented radio signals used by the
hit squad. Our forensics team believes the syndicate’s operational protocol involves
broadcasting a shared initial sequence across all channels. Isolate this shared root signal
to tap into their frequency.
  `,

        glitch: `
The hit squad shares a unified origin protocol. Align their encrypted
messages side-by-side and isolate the exact moment their stories diverge.
  `,

        terminal: `
> FILE: TRACE_INPUT_2

Test Case 1:
INPUT:
strs = ["flower","flow","flight"]

OUTPUT:
"fl"

Test Case 2:
INPUT:
strs = ["dog","racecar","car"]

OUTPUT:
""

Constraints:
1 <= strs.length <= 200
  `,

        autopsy: {
          subjectId: "TRACE-01-B",
          tod: "N/A",
          cause: "PATTERN RETENTION",

          notes: `
Traces of invisible ink were found on the victim’s fingertips under heavy UV light. The
victim’s pupils were unnaturally dilated, pointing to exposure to a rapid-acting nerve
agent. Rigor mortis is unusually advanced for the estimated time of death.
    `
        },

        image: "https://picsum.photos/seed/case_4/600/250"
      },

      5: {
        caseId: "C1Q5",
        subject: "The Broken Evidence",

        police: `
Werecovered the physical safe from the crime scene. It uses a complex locking mechanism
consisting of different bracket shapes. Our intelligence suggests the safe will only open if
every sequence of brackets is perfectly nested and closed in order. Verify if the retrieved
code sequence is valid to unlock it.
  `,

        glitch: `
The vault’s tumblers operate on a strict last-in, first-out mechanism.
Every lock engaged must be perfectly countered by its matching release key.
  `,

        terminal: `
> FILE: TRACE_INPUT_2

Test Case 1:
INPUT:
s = "()[]"

OUTPUT:
true

Test Case 2:
INPUT:
s = "(]"

OUTPUT:
false

Constraints:
1 <= s.length <= 10^4
  `,

        autopsy: {
          subjectId: "TRACE-01-B",
          tod: "N/A",
          cause: "PATTERN RETENTION",

          notes: `
The victim’s fingernails are heavily chipped, indicating they tried to claw the vault open
in a panic. Chemical burns on the epidermis map exactly to the shape of the safe’s dial.
Toxicology screens show heavily elevated adrenaline levels at the time of expiration.
    `
        },

        image: "https://picsum.photos/seed/case_5/600/250"
      },


      6: {
        caseId: "C1Q6",
        subject: "The Hidden Evidence",

        police: `
Our surveillance cameras captured the suspect swiping multiple keycards, but the sys
tem logged a messy sequence of sorted IDs with many duplicates. To track the unique
movement pattern of the killer, we need to clean the ledger by removing the duplicate
entries completely without allocating extra memory.
  `,

        glitch: `
The syndicate flooded the logs with decoys. Filter out the noise by
shifting only the unique, unrepeated signatures to the forefront of the evidence ledger.
  `,

        terminal: `
> FILE: TRACE_INPUT_2

Test Case 1:
INPUT:
nums = [1,1,2]

OUTPUT:
2, nums = [1,2]

Test Case 2:
INPUT:
nums = [0,0,1,1,1,2,2,3,3,4]

OUTPUT:
5, nums = [0,1,2,3,4]

Constraints:
1 <= nums.length <= 3 * 10^4
  `,

        autopsy: {
          subjectId: "TRACE-01-B",
          tod: "N/A",
          cause: "PATTERN RETENTION",

          notes: `
Blunt force trauma to the cranium is consistent with the blunt edge of a heavy mechanical
keyboard. Tiny metallic fragments were embedded deeply within the scalp tissue. The cool
ing rate of the liver suggests the ambient temperature was severely dropped post-mortem.
    `
        },

        image: "https://picsum.photos/seed/case_6/600/250"
      },

      8: {
        caseId: "C1Q8",
        subject: "The Cryptic Evidence",

        police: `
Ahastily typed message was found in the victim’s drafts before their terminal was wiped.
The message has trailing spaces and is heavily fragmented. Determine the exact length
of the final critical word in this message to decrypt the attached payload.
  `,

        glitch: `
The transmission cuts out at the end. By scanning from the very last
received signal backwards, you can isolate the final intact string.
  `,

        terminal: `
> FILE: TRACE_INPUT_2

Test Case 1:
INPUT:
s = "Hello World"

OUTPUT:
5

Test Case 2:
INPUT:
s = " fly me to the moon "

OUTPUT:
4

Constraints:
1 <= s.length <= 10^4
  `,

        autopsy: {
          subjectId: "TRACE-01-B",
          tod: "N/A",
          cause: "PATTERN RETENTION",

          notes: `
Post-mortem toxicology revealed fatal levels of digitalis disguised in a cup of coffee. The
victim’s internal temperature dropped rapidly, suggesting they were locked inside the
server room cooling unit. Frostbite on the extremities corroborates the prolonged freezing
exposure.
    `
        },

        image: "https://picsum.photos/seed/case_9/600/250"
      },

      7: {
        caseId: "C1Q7",
        subject: "The Fatal Evidence",

        police: `
Wehaveachronologically ordered list of access times, but one critical breach timestamp is
missing. We need to determine exactly where this timestamp should have been recorded
to maintain the chronological integrity of the logs. Pinpoint the correct insertion point.
  `,

        glitch: `
The timeline is perfectly ordered. Instead of checking every second, cut
the search space in half repeatedly to locate the exact breach point.
  `,

        terminal: `
> FILE: TRACE_INPUT_2

Test Case 1:
INPUT:
nums = [1,3,5,6], target = 5

OUTPUT:
2

Test Case 2:
INPUT:
nums = [1,3,5,6], target = 2

OUTPUT:
1

Constraints:
1 <= nums.length <= 10^4
  `,

        autopsy: {
          subjectId: "TRACE-01-B",
          tod: "N/A",
          cause: "PATTERN RETENTION",

          notes: `
Electrical burn marks found on the left hand indicate localized high-voltage shock. The
pacemaker logs show a massive sudden surge that overrode the heart’s natural rhythm.
Singed fabric fibers were melted directly into the dermal layer.
    `
        },

        image: "https://picsum.photos/seed/case_8/600/250"
      },

      9: {
        caseId: "C1Q9",
        subject: "The Cryptic Evidence",

        police: `
The syndicate’s internal clock is represented as an array of digits. Our intelligence indi
cates that the murder occurred exactly one tick after the recovered timestamp. Increment
the digital array by a single unit to reveal the true time of death.
  `,

        glitch: `
Watch out for the cascading overflow. Adding a single tick to a clock
that reads all nines requires expanding the entire digital display.
  `,

        terminal: `
> FILE: TRACE_INPUT_2

Test Case 1:
INPUT:
digits = [1,2,3]

OUTPUT:
[1,2,4]

Test Case 2:
INPUT:
digits = [9]

OUTPUT:
[1,0]

Constraints:
1 <= digits.length <= 100
  `,

        autopsy: {
          subjectId: "TRACE-01-B",
          tod: "N/A",
          cause: "PATTERN RETENTION",

          notes: `
The coroner noted peculiar microscopic circuitry etched directly into the victim’s retinas.
The cause of death is recorded as a massive cerebral hemorrhage. The sheer intensity of
the trauma suggests a lethal neural-overload broadcast.
    `
        },

        image: "https://picsum.photos/seed/case_10/600/250"
      },

      10: {
        caseId: "C1Q5",
        subject: "The Broken Evidence",

        police: `
Werecovered the physical safe from the crime scene. It uses a complex locking mechanism
consisting of different bracket shapes. Our intelligence suggests the safe will only open if
every sequence of brackets is perfectly nested and closed in order. Verify if the retrieved
code sequence is valid to unlock it.
  `,

        glitch: `
The vault’s tumblers operate on a strict last-in, first-out mechanism.
Every lock engaged must be perfectly countered by its matching release key.
  `,

        terminal: `
> FILE: TRACE_INPUT_2

Test Case 1:
INPUT:
s = "()[]"

OUTPUT:
true

Test Case 2:
INPUT:
s = "(]"

OUTPUT:
false

Constraints:
1 <= s.length <= 10^4
  `,

        autopsy: {
          subjectId: "TRACE-01-B",
          tod: "N/A",
          cause: "PATTERN RETENTION",

          notes: `
The victim’s fingernails are heavily chipped, indicating they tried to claw the vault open
in a panic. Chemical burns on the epidermis map exactly to the shape of the safe’s dial.
Toxicology screens show heavily elevated adrenaline levels at the time of expiration.
    `
        },

        image: "https://picsum.photos/seed/case_5/600/250"
      },
      
    },

    
  },

  2: {
    title: "The Silent Witness",
    questions: {
      1: { subject: "Unknown Observer" }
    }
  }
};

export default cases;