"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function globalTeardown(config) {
    console.log('SauceDemo Global Teardown Started');
    // Clean up any temporary files
    const fs = require('fs');
    const path = require('path');
    const tempDir = path.join(process.cwd(), 'temp');
    if (fs.existsSync(tempDir)) {
        try {
            fs.rmSync(tempDir, { recursive: true, force: true });
            console.log('Cleaned up temporary files');
        }
        catch (error) {
            console.warn('Failed to clean up temp directory:', error);
        }
    }
    // Generate test summary
    const reportsDir = path.join(process.cwd(), 'reports');
    const testResultsPath = path.join(reportsDir, 'test-results.json');
    if (fs.existsSync(testResultsPath)) {
        try {
            const testResults = JSON.parse(fs.readFileSync(testResultsPath, 'utf8'));
            const totalTests = testResults.suites?.reduce((acc, suite) => acc + (suite.specs?.reduce((specAcc, spec) => specAcc + (spec.tests?.length || 0), 0) || 0), 0) || 0;
            const passedTests = testResults.suites?.reduce((acc, suite) => acc + (suite.specs?.reduce((specAcc, spec) => specAcc + (spec.tests?.filter((test) => test.results?.[0]?.status === 'passed').length || 0), 0) || 0), 0) || 0;
            const failedTests = totalTests - passedTests;
            console.log('\n=== SauceDemo Test Summary ===');
            console.log(`Total Tests: ${totalTests}`);
            console.log(`Passed: ${passedTests}`);
            console.log(`Failed: ${failedTests}`);
            console.log(`Success Rate: ${totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(2) : 0}%`);
            console.log('===============================\n');
        }
        catch (error) {
            console.warn('Failed to generate test summary:', error);
        }
    }
    console.log('SauceDemo Global Teardown Completed');
}
exports.default = globalTeardown;
//# sourceMappingURL=global-teardown.js.map