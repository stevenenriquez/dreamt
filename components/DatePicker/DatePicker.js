import { MD3DarkTheme, PaperProvider, Portal } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { COLORS } from '../../constants/theme';

export default function DatePicker({
  date,
  setDate,
  datePickerVisible,
  setDatePickerVisible
}) {
  const portalTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#AAA',
      secondary: COLORS.white,
      background: COLORS.backgroundPrimary,
      backgroundVariant: COLORS.black,
      surface: COLORS.black,
      surfaceVariant: COLORS.black
    }
  };

  return (
    <PaperProvider theme={portalTheme}>
      <Portal>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={datePickerVisible}
          onDismiss={() => setDatePickerVisible(false)}
          date={date}
          onConfirm={(date) => {
            setDate(new Date(date.date));
            setDatePickerVisible(false);
          }}
          saveLabel="Save"
          label="Select date"
          animationType="fade"
          startYear={1900}
          endYear={new Date().getFullYear()}
        />
      </Portal>
    </PaperProvider>
  );
}