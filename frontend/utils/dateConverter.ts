export default function formatUnixDate(unixTime: number) {
    const date = new Date(unixTime * 1000)
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }