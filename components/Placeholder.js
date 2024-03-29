export default function Placeholder() {
    return (
      <SkeletonContent
        containerStyle={{ flex: 1, width: 300 }}
        isLoading={false}
        layout={[
          { key: 'someId', width: 220, height: 20, marginBottom: 6 },
          { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 }
        ]}
      >
        <Text style={styles.normalText}>Your content</Text>
        <Text style={styles.bigText}>Other content</Text>
      </SkeletonContent>
    );
  }