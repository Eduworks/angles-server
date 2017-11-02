es.angles.server

Deployed at https://angles.eduworks.org

# Build
 * mvn install

# Run
Not currently recommended, server endpoint is still angles.eduworks.org.
 * mvn jetty:run

# Deploy
Ensure your ~/.m2/settings.xml has the correct username and password (ask Fritz)
 * mvn tomcat7:deploy