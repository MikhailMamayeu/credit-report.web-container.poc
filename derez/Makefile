DOMAIN := credit-report
NAME := web-container-poc
VERSION := $(shell git rev-parse HEAD)
ROOT_DIR := $(dir $(CURDIR))
AWS_DEV_ACCOUNT := 029718257588
AWS_MAIN_ACCOUNT := 482506117024
AWS_REGION := eu-west-1
AWS_REGISTRY := $(AWS_MAIN_ACCOUNT).dkr.ecr.$(AWS_REGION).amazonaws.com/$(DOMAIN)/$(NAME)
K8S_CLUSTER := k8s-nonprod.vassily.io
ENVIRONMENT := test
HELM_CHART := paas-charts-nonprod/paas-stateless
BASE_NAME := $(DOMAIN).$(NAME).$(VERSION)
IMAGE := $(BASE_NAME).image
CONTAINER := $(BASE_NAME).container
TAR_FILESYSTEM := $(BASE_NAME).tar

### S3 ###

s3-image: # Build Docker image to generate Webpack assets
s3-image:
	docker build --build-arg HOST_TYPE=s3 -t $(IMAGE) -f $(ROOT_DIR)Dockerfile.s3 $(ROOT_DIR)

s3-build: # Generate Webpack assets in Docker container
s3-build:
	docker run --name $(CONTAINER) $(IMAGE)

s3-filesystem: # Extract filesystem from Docker container
s3-filesystem:
	docker export $(CONTAINER) > $(ROOT_DIR)$(TAR_FILESYSTEM)

s3-extract: # Extract Webpack assets from Docker filesystem
s3-extract:
	tar --strip-components=3 -xf $(ROOT_DIR)$(TAR_FILESYSTEM) -C $(ROOT_DIR) usr/src/app/dist
	rm `find $(ROOT_DIR)dist -type f -not -regex '.*gz$$'`
	find $(ROOT_DIR)dist -type f -regex '.*gz$$' -exec sh -c 'mv "$$0" "$${0%.gz}"' {} \;

s3-deploy: # Deploy assets to S3
s3-deploy:
	/bin/bash -c ". aws-assume-role $(AWS_DEV_ACCOUNT) && aws s3 sync $(ROOT_DIR)dist/ s3://ctm-fcr-web-poc --region $(AWS_REGION) --content-encoding gzip"

s3-clean: # Cleanup
s3-clean:
	docker rm $(CONTAINER)
	docker image rm $(IMAGE)
	rm -f $(ROOT_DIR)$(TAR_FILESYSTEM)
	rm -rf $(ROOT_DIR)dist

### PaaS ###

paas-build: # Build Docker image to push into ECR
paas-build:
	docker build --build-arg HOST_TYPE=nginx -t $(AWS_REGISTRY):$(VERSION) -f $(ROOT_DIR)Dockerfile.nginx $(ROOT_DIR)

pass-authenticate: # Authenticate into ECR
pass-authenticate:
	aws ecr get-login --registry-ids=$(AWS_MAIN_ACCOUNT) --no-include-email --region=$(AWS_REGION)

paas-push: # Push Docker image into ECR
paas-push: pass-authenticate
	docker push $(AWS_REGISTRY):$(VERSION)

paas-clean: # Cleanup
paas-clean:
	docker image rm $(AWS_REGISTRY):$(VERSION)

paas-deploy: # Deploy to PaaS
paas-deploy:
	kubectl config use-context $(K8S_CLUSTER)
	helm upgrade --install --debug --wait \
	--create-namespace --history-max 4 \
	--namespace=$(DOMAIN)-$(ENVIRONMENT) \
	-f $(NAME).yaml \
	-f $(NAME)-$(ENVIRONMENT).yaml \
	--set "service.version=$(VERSION)" \
	--set "env=$(ENVIRONMENT)" \
	$(DOMAIN)-$(NAME)-$(ENVIRONMENT) \
	$(HELM_CHART)
