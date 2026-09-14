import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FA',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F1F2E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#5A5A6E',
    marginBottom: 24,
    lineHeight: 21,
  },
  button: {
    backgroundColor: '#4C5FD5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#A0A6C0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#DADAE6',
  },
  addButton: {
    backgroundColor: '#4C5FD5',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 16,
    color: '#1F1F2E',
  },
  listItemHint: {
    fontSize: 11,
    color: '#A0A6C0',
  },
});
