import * as puppeteer from 'puppeteer'

const crimeStatsScraper = async () => {
  try {
    // Launch a browser instance
    const browser = await puppeteer.launch({
      headless: true, // set this to true to run the browser in headless mode
      defaultViewport: null
    })

    // Open a new page
    const page = await browser.newPage()

    // Navigate to the URL of the page with the table
    await page.goto('https://jcf.gov.jm/stats', { waitUntil: 'networkidle0' })

    // Get the table data
    const tableData = await page.evaluate(() => {
      const data: any[] = []

      // Get the rows in the table
      const rows = document.querySelectorAll('table tr')

      // Iterate through the rows
      for (const row of rows) {
        const cells = row.querySelectorAll('td')

        // Get the data for the current row
        const rowData = [...cells].map((cell) => cell.textContent?.trim())

        // Add the data for the current row to the array
        data.push(rowData)
      }

      return data
    })

    // Close the browser
    await browser.close()
    return tableData
  } catch (error: any) {
    if (error !== null) {
      let errorMessage: string
      if (error instanceof Error) {
        errorMessage = error.message
      } else {
        errorMessage = JSON.stringify(error)
      }
      console.log(`Error: ${errorMessage}`)
    }
  }
}
export default crimeStatsScraper
