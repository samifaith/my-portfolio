# Shareable case studies

Project modals use `/expertise?project=<visible-project-id>`; append
`&projectView=study` to share the reading view, or omit it for the live project
where available. The reading panel includes a direct-link action. It is a normal
link that supports copying its address or opening in a new tab.

Opening a project pushes one history entry. Next/previous project and live/study
switches replace that entry: Back dismisses the modal, Forward reopens the latest
project/view. Closing a direct-entry link removes only the project parameters
without leaving the portfolio. Refresh restores the current URL state. Other
query parameters, hash, and router state are preserved.

Only currently displayed project IDs are accepted. Unknown and hidden IDs are
removed with an unavailable notice; they never expose suppressed project content.
The URL controls visibility, not component identity, so changing views does not
reload the embedded live application. A completed old exit animation cannot clear
a newly opened modal.
