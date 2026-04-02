/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from "./components/Header";
import StackingLayout from "./components/StackingLayout";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <main>
        <StackingLayout />
      </main>
      <Footer />
    </div>
  );
}
