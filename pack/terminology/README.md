# pack/terminology/

The NL + FR + EN glossary. Every label the UI shows comes from here. Every validation message the UI shows comes from here. Both the design skill and the requirements skill refuse to invent copy — if a label is not in this folder, the pipeline is blocked.

| File | What's in it |
| --- | --- |
| `nl-fields.md` | ANB-1293 Dutch field names, action labels, state labels. |
| `validation.md` | NL / FR / EN validation copy. |

The first build of the admin is NL only; FR and EN labels follow the same key structure once translations arrive (`[ANB-1308]`).
