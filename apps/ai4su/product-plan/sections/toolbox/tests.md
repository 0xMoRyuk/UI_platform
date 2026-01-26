# Test Instructions: Toolbox

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

The Toolbox section displays AI models with filtering, search, detail modals, and downloadable resources. Test filtering, search, modal interactions, and download functionality.

---

## User Flow Tests

### Flow 1: Browse and Filter Models

**Scenario:** User filters models by sector

**Setup:**
- Render Toolbox with 24 models across various sectors
- Mock `onFilterChange` callback

**Steps:**
1. User clicks "Agriculture" checkbox in filter sidebar
2. Model grid updates

**Expected Results:**
- [ ] Only Agriculture models are displayed
- [ ] Model count updates (e.g., "Showing 6 of 24 models")
- [ ] "Agriculture" checkbox is checked
- [ ] `onFilterChange` is called with `{ sectors: ['agriculture'] }`

### Flow 2: Search for Model

**Scenario:** User searches for a specific model

**Setup:**
- Render Toolbox with models including "CropYield AI"

**Steps:**
1. User types "crop" in search input
2. Results filter in real-time

**Expected Results:**
- [ ] Only models containing "crop" are displayed
- [ ] "CropYield AI" appears in results
- [ ] Search is case-insensitive
- [ ] Partial matches work (searching "yie" shows "CropYield")

### Flow 3: View Model Details

**Scenario:** User views full model information

**Setup:**
- Mock `onModelClick` and `onGitHubClick` callbacks

**Steps:**
1. User clicks "CropYield AI" model card
2. Modal opens with details
3. User clicks "View on GitHub" button

**Expected Results:**
- [ ] Modal displays model name "CropYield AI"
- [ ] Modal shows full description
- [ ] Modal shows use case and technical requirements
- [ ] Modal shows sector badge and country flag
- [ ] "View on GitHub" button is visible
- [ ] Clicking GitHub button calls `onGitHubClick` with URL
- [ ] Clicking backdrop or X closes modal

#### Failure Path: Modal Accessibility

**Steps:**
1. User opens modal
2. User presses Escape key

**Expected Results:**
- [ ] Modal closes
- [ ] Focus returns to triggering element

### Flow 4: Download Study

**Scenario:** User downloads a research study PDF

**Setup:**
- Mock `onDownload` callback

**Steps:**
1. User scrolls to Studies section
2. User clicks "Download PDF" button on a study card

**Expected Results:**
- [ ] `onDownload` is called with `(studyId, 'study')`
- [ ] Button shows loading state during download
- [ ] Success feedback after download completes

---

## Empty State Tests

### No Models Match Filters

**Scenario:** Filters result in zero matches

**Setup:**
- Apply filters that match no models (e.g., Agriculture + Kenya with no overlap)

**Expected Results:**
- [ ] Empty state component displays
- [ ] Shows message "No models found"
- [ ] Shows "Try adjusting your filters" suggestion
- [ ] Shows "Clear filters" button
- [ ] Clicking "Clear filters" resets all filters

### No Models Exist

**Scenario:** Model list is completely empty

**Setup:**
- `models = []`

**Expected Results:**
- [ ] Empty state displays "No AI models available yet"
- [ ] Filter sidebar is disabled or hidden
- [ ] Search input may be hidden

---

## Component Interaction Tests

### ModelCard

**Renders correctly:**
- [ ] Displays model name
- [ ] Displays short description (truncated to 2 lines)
- [ ] Shows sector badge with appropriate color
- [ ] Shows country flag

**User interactions:**
- [ ] Clicking card opens detail modal
- [ ] Hover shows shadow/border effect

### ModelFilterSidebar

**Renders correctly:**
- [ ] Shows "Sector" section with 6 checkboxes
- [ ] Shows "Country" section with 8 checkboxes
- [ ] All checkboxes initially unchecked

**User interactions:**
- [ ] Clicking checkbox toggles filter
- [ ] Multiple checkboxes can be selected
- [ ] "Clear all" button resets filters

### SearchInput

**Renders correctly:**
- [ ] Shows magnifying glass icon
- [ ] Shows placeholder "Search models..."

**User interactions:**
- [ ] Typing filters results
- [ ] Clearing input shows all models
- [ ] Debounces input (doesn't filter on every keystroke)

---

## Edge Cases

- [ ] Handles very long model names with truncation
- [ ] Search handles special characters
- [ ] Filters work correctly when combined (AND logic)
- [ ] Grid displays correctly with 1, 10, and 100 models
- [ ] Mobile: filters collapse to expandable dropdown

---

## Accessibility Checks

- [ ] Filter checkboxes have labels
- [ ] Search input has associated label
- [ ] Modal traps focus while open
- [ ] Modal is announced to screen readers
- [ ] Download buttons indicate file type

---

## Sample Test Data

```typescript
const mockModel = {
  id: "cropyield-ai",
  name: "CropYield AI",
  shortDescription: "ML model for predicting crop yields",
  fullDescription: "A machine learning model trained on...",
  sector: "agriculture",
  country: "kenya",
  githubUrl: "https://github.com/ai4startups/cropyield-ai",
  useCase: "Farmers can use this model to...",
  requirements: "Python 3.8+, TensorFlow 2.x"
}

const mockModels = [mockModel, /* ... 23 more */]

const mockEmptyFilters = {
  sectors: [],
  countries: [],
  searchQuery: ""
}
```
