@tailwind base;
@tailwind components;
@tailwind utilities;

/\*\*

- CSS Variables للثيم الفاتح والغامق
-
- الثيم الافتراضي: فاتح (مبني على ألوان النموذج البديل)
- للتبديل للثيم الغامق: أضف class="dark" على عنصر html أو body
  \*/

:root {
/_ ========== الثيم الفاتح (الافتراضي) ========== _/

/_ الألوان الأساسية _/
--color-primary: #00ADB5;
--color-primary-dark: #008B91;
--color-primary-darker: #006B6F;
--color-primary-light: #33BDC4;

/_ اللون الثانوي _/
--color-secondary: #393E46;
--color-secondary-darker: #222831;

/_ ألوان الإبراز _/
--color-accent-primary: #00ADB5;
--color-accent: #00ADB5;
--color-accent-secondary: #33BDC4;
--color-accent-dark: #008B91;
--color-accent-warm: #00C8D1;
--color-accent-light: #E6F9FA;

/_ الألوان المحايدة _/
--color-neutral-bg: #FFFFFF;
--color-neutral-background: #FFFFFF;
--color-neutral-surface: #EEEEEE;
--color-neutral-surface-alt: #E0E0E0;
--color-neutral-border: #CCCCCC;
--color-neutral-text-muted: #9E9E9E;
--color-neutral-text-secondary: #757575;
--color-neutral-light: #F5F5F5;
--color-neutral: #BDBDBD;
--color-neutral-dark: #616161;
--color-neutral-darker: #222831;

/_ ألوان الحالة _/
--color-status-success: #00C853;
--color-status-error: #D32F2F;
--color-status-warning: #FFB300;
--color-status-info: #00ADB5;

/_ التدرجات _/
--gradient-gold: linear-gradient(135deg, #00ADB5 0%, #00C8D1 100%);
--gradient-primary: linear-gradient(135deg, #00ADB5 0%, #008B91 100%);
--gradient-hero: linear-gradient(180deg, #222831 0%, #393E46 100%);
--gradient-cta: linear-gradient(135deg, #00ADB5 0%, #393E46 100%);

/_ Ring colors with opacity _/
--ring-primary-dark-20: rgba(0, 139, 145, 0.2);
--bg-neutral-light-20: rgba(238, 238, 238, 0.2);
--bg-neutral-darker-80: rgba(34, 40, 49, 0.8);
--bg-white-10: rgba(255, 255, 255, 0.1);
--bg-black-10: rgba(0, 0, 0, 0.1);
}

/_ ========== الثيم الغامق ========== _/
.dark {
/_ الألوان الأساسية - معكوسة للثيم الغامق _/
--color-primary: #00ADB5;
--color-primary-dark: #33BDC4;
--color-primary-darker: #66CDD3;
--color-primary-light: #008B91;

/_ اللون الثانوي _/
--color-secondary: #393E46;
--color-secondary-darker: #4A4F58;

/_ ألوان الإبراز - متناسقة مع الثيم الغامق _/
--color-accent-primary: #00C8D1;
--color-accent: #00C8D1;
--color-accent-secondary: #33D4DC;
--color-accent-dark: #00ADB5;
--color-accent-warm: #00E0EA;
--color-accent-light: #1A3335;

/_ الألوان المحايدة - معكوسة بشكل ذكي _/
--color-neutral-bg: #222831;
--color-neutral-background: #222831;
--color-neutral-surface: #393E46;
--color-neutral-surface-alt: #4A4F58;
--color-neutral-border: #5B6069;
--color-neutral-text-muted: #9E9E9E;
--color-neutral-text-secondary: #BDBDBD;
--color-neutral-light: #4A4F58;
--color-neutral: #757575;
--color-neutral-dark: #E0E0E0;
--color-neutral-darker: #EEEEEE;

/_ ألوان الحالة - محسّنة للثيم الغامق _/
--color-status-success: #00E676;
--color-status-error: #FF5252;
--color-status-warning: #FFD740;
--color-status-info: #00ADB5;

/_ التدرجات - متوافقة مع الثيم الغامق _/
--gradient-gold: linear-gradient(135deg, #00C8D1 0%, #00E0EA 100%);
--gradient-primary: linear-gradient(135deg, #00ADB5 0%, #008B91 100%);
--gradient-hero: linear-gradient(180deg, #222831 0%, #393E46 100%);
--gradient-cta: linear-gradient(135deg, #00ADB5 0%, #393E46 100%);

/_ Ring colors with opacity - محدّثة _/
--ring-primary-dark-20: rgba(51, 189, 196, 0.2);
--bg-neutral-light-20: rgba(74, 79, 88, 0.2);
--bg-neutral-darker-80: rgba(238, 238, 238, 0.1);
--bg-white-10: rgba(255, 255, 255, 0.05);
--bg-black-10: rgba(0, 0, 0, 0.3);
}

/_ ========================================
BASE STYLES
======================================== _/

@layer base {
/_ إعادة تعيين أساسية _/

- {
  @apply border-border;
  }

html {
@apply antialiased;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}

body {
background-color: var(--color-neutral-bg);
color: var(--color-neutral-darker);
font-feature-settings: "rlig" 1, "calt" 1;
direction: rtl;
min-height: 100vh;
transition: background-color 0.3s ease, color 0.3s ease;
}

/_ تحسين النصوص العربية _/
body {
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

/_ تحسين العناوين _/
h1,
h2,
h3,
h4,
h5,
h6 {
@apply font-bold;
color: var(--color-neutral-darker);
transition: color 0.3s ease;
}

h1 {
@apply text-5xl leading-tight;
}

h2 {
@apply text-4xl leading-tight;
}

h3 {
@apply text-3xl leading-snug;
}

h4 {
@apply text-2xl leading-snug;
}

h5 {
@apply text-xl leading-normal;
}

h6 {
@apply text-lg leading-normal;
}

/_ تحسين الفقرات _/
p {
@apply text-base leading-relaxed;
color: var(--color-neutral-dark);
transition: color 0.3s ease;
}

/_ تحسين الروابط _/
a {
color: var(--color-primary-dark);
@apply transition-colors duration-200;
}

a:hover {
color: var(--color-primary-darker);
}

/_ تحسين الأزرار _/
button {
@apply cursor-pointer;
}

button:disabled {
@apply cursor-not-allowed opacity-50;
}

/_ تحسين الـ inputs _/
input,
textarea,
select {
@apply w-full rounded-lg px-4 py-2 outline-none transition-all duration-200;
background-color: var(--color-neutral-surface);
border: 2px solid var(--color-neutral-border);
color: var(--color-neutral-darker);
}

input:focus,
textarea:focus,
select:focus {
border-color: var(--color-primary-dark);
box-shadow: 0 0 0 2px var(--ring-primary-dark-20);
}

input::placeholder,
textarea::placeholder {
color: var(--color-neutral-text-muted);
}

/_ تحسين القوائم _/
ul,
ol {
@apply list-inside space-y-2;
}

ul {
@apply list-disc;
}

ol {
@apply list-decimal;
}

/_ تحسين الصور _/
img {
@apply max-w-full h-auto;
}

/_ تحسين الكود _/
code {
@apply rounded px-2 py-1 text-sm font-mono;
color: var(--color-primary-dark);
background-color: var(--bg-neutral-light-20);
}

pre {
@apply overflow-x-auto rounded-lg p-4 text-sm;
background-color: var(--color-neutral-surface-alt);
}

pre code {
@apply bg-transparent p-0;
color: var(--color-neutral-darker);
}

/_ تحسين الجداول _/
table {
@apply w-full border-collapse;
}

th {
@apply px-4 py-2 text-right font-bold;
border: 2px solid var(--color-neutral-border);
background-color: var(--color-accent-light);
}

td {
@apply px-4 py-2;
border: 2px solid var(--color-neutral-border);
}

/_ تحسين الـ scrollbar _/
::-webkit-scrollbar {
@apply w-2 h-2;
}

::-webkit-scrollbar-track {
background-color: var(--color-neutral-bg);
}

::-webkit-scrollbar-thumb {
@apply rounded-full;
background-color: var(--color-neutral);
}

::-webkit-scrollbar-thumb:hover {
background-color: var(--color-neutral-dark);
}
}

/_ ========================================
COMPONENTS
======================================== _/

@layer components {
/_ Container _/
.container {
@apply mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8;
}

.container-sm {
@apply mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8;
}

.container-lg {
@apply mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8;
}

/_ Section Spacing _/
.section {
@apply py-16 md:py-20 lg:py-24;
}

.section-sm {
@apply py-8 md:py-12 lg:py-16;
}

.section-lg {
@apply py-20 md:py-28 lg:py-32;
}

/_ Text Direction _/
.rtl {
direction: rtl;
}

.ltr {
direction: ltr;
}

/_ Gradient Text _/
.gradient-text {
background: var(--gradient-primary);
@apply bg-clip-text text-transparent;
}

.gradient-text-accent {
background: var(--gradient-gold);
@apply bg-clip-text text-transparent;
}

/_ Gradient Background _/
.gradient-bg-primary {
background: var(--gradient-primary);
}

.gradient-bg-accent {
background: var(--gradient-gold);
}

.gradient-bg-hero {
background: var(--gradient-hero);
}

.gradient-bg-cta {
background: var(--gradient-cta);
}

/_ Card Styles _/
.card {
@apply rounded-xl p-6 shadow-md transition-all duration-300;
background-color: var(--color-neutral-surface);
}

.card-hover {
@apply hover:shadow-xl hover:-translate-y-1;
}

.card-bordered {
border: 2px solid var(--color-neutral-border);
}

/_ Button Base _/
.btn {
@apply inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-bold transition-all duration-200;
@apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2;
@apply disabled:pointer-events-none disabled:opacity-50;
}

/_ Input Styles _/
.input {
@apply w-full rounded-lg px-4 py-3 outline-none transition-all duration-200;
background-color: var(--color-neutral-surface);
border: 2px solid var(--color-neutral-border);
color: var(--color-neutral-darker);
}

.input:focus {
border-color: var(--color-primary-dark);
box-shadow: 0 0 0 2px var(--ring-primary-dark-20);
}

.input-error {
@apply border-red-500 focus:border-red-500;
}

.input-error:focus {
box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.2);
}

/_ Badge _/
.badge {
@apply inline-flex items-center rounded-full px-3 py-1 text-sm font-bold;
}

.badge-primary {
background-color: var(--color-primary-dark);
color: white;
}

.badge-accent {
background-color: var(--color-accent-dark);
color: white;
}

.badge-outline {
border: 2px solid var(--color-primary-dark);
color: var(--color-primary-dark);
}

/_ Divider _/
.divider {
border-top: 2px solid var(--color-neutral-border);
}

.divider-vertical {
border-right: 2px solid var(--color-neutral-border);
}

/_ Loading Spinner _/
.spinner {
@apply animate-spin rounded-full border-4;
border-color: var(--color-neutral-border);
border-top-color: var(--color-primary-dark);
}

/_ Glass Effect _/
.glass {
@apply backdrop-blur-sm;
background-color: var(--bg-white-10);
}

.glass-dark {
@apply backdrop-blur-sm;
background-color: var(--bg-black-10);
}

/_ Overlay _/
.overlay {
@apply fixed inset-0 backdrop-blur-sm;
background-color: var(--bg-neutral-darker-80);
}

/_ Focus Styles _/
.focus-visible {
@apply outline-none ring-2 ring-offset-2;
--tw-ring-color: var(--color-primary-dark);
}
}

/_ ========================================
UTILITIES
======================================== _/

@layer utilities {
/_ Text Utilities _/
.text-balance {
text-wrap: balance;
}

.text-pretty {
text-wrap: pretty;
}

/_ Flex Center _/
.flex-center {
@apply flex items-center justify-center;
}

.flex-between {
@apply flex items-center justify-between;
}

/_ Absolute Center _/
.absolute-center {
@apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
}

/_ Grid Auto Fit _/
.grid-auto-fit {
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.grid-auto-fill {
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

/_ Aspect Ratios _/
.aspect-square {
aspect-ratio: 1 / 1;
}

.aspect-video {
aspect-ratio: 16 / 9;
}

.aspect-portrait {
aspect-ratio: 3 / 4;
}

/_ Hide Scrollbar _/
.hide-scrollbar {
-ms-overflow-style: none;
scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
display: none;
}

/_ Truncate Lines _/
.line-clamp-1 {
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}

.line-clamp-2 {
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
}

.line-clamp-3 {
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
}

/_ Safe Area (for mobile notches) _/
.safe-top {
padding-top: env(safe-area-inset-top);
}

.safe-bottom {
padding-bottom: env(safe-area-inset-bottom);
}

.safe-left {
padding-left: env(safe-area-inset-left);
}

.safe-right {
padding-right: env(safe-area-inset-right);
}
}

/_ ========================================
ANIMATIONS
======================================== _/

@layer utilities {
/_ Fade In _/
@keyframes fadeIn {
from {
opacity: 0;
}
to {
opacity: 1;
}
}

.animate-fade-in {
animation: fadeIn 0.3s ease-in-out;
}

/_ Slide Up _/
@keyframes slideUp {
from {
transform: translateY(20px);
opacity: 0;
}
to {
transform: translateY(0);
opacity: 1;
}
}

.animate-slide-up {
animation: slideUp 0.4s ease-out;
}

/_ Slide Down _/
@keyframes slideDown {
from {
transform: translateY(-20px);
opacity: 0;
}
to {
transform: translateY(0);
opacity: 1;
}
}

.animate-slide-down {
animation: slideDown 0.4s ease-out;
}

/_ Scale _/
@keyframes scaleIn {
from {
transform: scale(0.9);
opacity: 0;
}
to {
transform: scale(1);
opacity: 1;
}
}

.animate-scale-in {
animation: scaleIn 0.3s ease-out;
}

/_ Pulse _/
@keyframes pulse {
0%,
100% {
opacity: 1;
}
50% {
opacity: 0.5;
}
}

.animate-pulse-slow {
animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/_ Bounce _/
@keyframes bounce {
0%,
100% {
transform: translateY(0);
}
50% {
transform: translateY(-10px);
}
}

.animate-bounce-slow {
animation: bounce 2s infinite;
}

/_ Shake _/
@keyframes shake {
0%,
100% {
transform: translateX(0);
}
25% {
transform: translateX(-5px);
}
75% {
transform: translateX(5px);
}
}

.animate-shake {
animation: shake 0.3s ease-in-out;
}
}

/_ ========================================
PRINT STYLES
======================================== _/

@media print {
body {
@apply bg-white text-black;
}

.no-print {
display: none !important;
}
}

/_ ========================================
ACCESSIBILITY
======================================== _/

/_ Focus visible for keyboard navigation _/
:focus-visible {
@apply outline-none ring-2 ring-offset-2;
--tw-ring-color: var(--color-primary-dark);
}

/_ Reduce motion for users who prefer it _/
@media (prefers-reduced-motion: reduce) {
_,
_::before,
\*::after {
animation-duration: 0.01ms !important;
animation-iteration-count: 1 !important;
transition-duration: 0.01ms !important;
}
}

/_ High contrast mode _/
@media (prefers-contrast: high) {
body {
color: var(--color-neutral-darker);
}

a {
@apply underline;
}
}

/_ ========================================
RESPONSIVE HELPERS
======================================== _/

/_ Show/Hide on specific breakpoints _/
@layer utilities {
.show-on-mobile {
@apply block md:hidden;
}

.show-on-tablet {
@apply hidden md:block lg:hidden;
}

.show-on-desktop {
@apply hidden lg:block;
}

.hide-on-mobile {
@apply hidden md:block;
}

.hide-on-tablet {
@apply block md:hidden lg:block;
}

.hide-on-desktop {
@apply block lg:hidden;
}
}
